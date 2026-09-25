type ApiFetchOptions = Omit<RequestInit, "body"> & {
  endpoint?: string;
  body?: unknown;
  baseUrl?: string;
  returnResponse?: boolean;
  _isRetry?: boolean;
};

export type ApiFetchError = {
  message: string;
  status: number;
  details?: unknown;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://apiexample.com";

const buildUrl = (endpoint: string, baseUrl?: string) => {
  if (endpoint.startsWith("http")) return endpoint;
  if (baseUrl === "") return endpoint;
  const root = baseUrl ?? API_BASE_URL;
  const normalizedRoot = root.endsWith("/") ? root.slice(0, -1) : root;
  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${normalizedRoot}${normalizedEndpoint}`;
};

// The access token is short-lived (minutes), but nothing else in the app ever
// refreshes it proactively. Without this, every request silently 401s once the
// token expires mid-session. This calls the same-origin session route (which
// reads the httpOnly refresh-token cookie) to mint a fresh access token.
let refreshInFlight: Promise<string | null> | null = null;

const refreshAccessToken = async (): Promise<string | null> => {
  if (!refreshInFlight) {
    refreshInFlight = fetch("/api/auth/session?refresh=true", {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    })
      .then(async (res) => {
        if (!res.ok) return null;
        const payload = await res.json().catch(() => null);
        const accessToken =
          payload && typeof payload === "object" && "data" in payload
            ? (payload as { data?: { accessToken?: string } }).data?.accessToken
            : undefined;
        return accessToken ?? null;
      })
      .catch(() => null)
      .finally(() => {
        refreshInFlight = null;
      });
  }

  return refreshInFlight;
};

export async function apiFetch<T>(
  pathOrOptions: string | ApiFetchOptions,
  options: ApiFetchOptions = {}
): Promise<T> {
  const mergedOptions =
    typeof pathOrOptions === "string"
      ? { ...options, endpoint: pathOrOptions }
      : pathOrOptions;

  const endpoint = mergedOptions.endpoint ?? "";
  const url = buildUrl(endpoint, mergedOptions.baseUrl);
  const headers = new Headers(mergedOptions.headers);
  const hasBody = mergedOptions.body !== undefined && mergedOptions.body !== null;

  let body: BodyInit | undefined;
  if (hasBody) {
    if (mergedOptions.body instanceof FormData) {
      body = mergedOptions.body;
    } else {
      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }
      body =
        typeof mergedOptions.body === "string"
          ? mergedOptions.body
          : JSON.stringify(mergedOptions.body);
    }
  }

  const response = await fetch(url, {
    ...mergedOptions,
    body,
    headers,
    credentials: mergedOptions.credentials ?? "include",
  });

  if (mergedOptions.returnResponse) {
    return response as unknown as T;
  }

  if (
    response.status === 401 &&
    !mergedOptions._isRetry &&
    headers.has("Authorization")
  ) {
    const freshToken = await refreshAccessToken();
    if (freshToken) {
      const retryHeaders = new Headers(headers);
      retryHeaders.set("Authorization", `Bearer ${freshToken}`);
      return apiFetch<T>({
        ...mergedOptions,
        headers: retryHeaders,
        body: mergedOptions.body,
        _isRetry: true,
      });
    }
  }

  if (!response.ok) {
    const contentType = response.headers.get("content-type") ?? "";
    const details = contentType.includes("application/json")
      ? await response.json().catch(() => undefined)
      : await response.text().catch(() => undefined);
    const message =
      typeof details === "object" && details && "message" in details
        ? String((details as { message?: string }).message)
        : "Request failed";
    const error: ApiFetchError = {
      message,
      status: response.status,
      details,
    };
    throw error;
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return (await response.json()) as T;
  }

  return (await response.text()) as T;
}
