"use client";

import Link from "next/link";
import { useDashboardData } from "../../_components/DashboardDataProvider";

const formatSessionTime = (value?: string | null) => {
  if (!value) return "Recently active";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently active";
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export default function SessionsPage() {
  const { sessions, isLoading } = useDashboardData();

  return (
    <div className="h-[calc(100%-4rem)] overflow-y-auto custom-scrollbar-settings p-4 sm:p-6 md:p-8 bg-surface">
      <div className="max-w-3xl mx-auto space-y-6 pb-8">
        <div>
          <h1 className="font-headline-md text-headline-md text-on-surface">
            Sessions
          </h1>
          <p className="text-body-md text-on-surface-variant">
            Every session you&apos;ve started, with reports for the ones that finished.
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`session-skeleton-${index}`}
                className="p-4 bg-surface-container-low border border-outline-variant/30 rounded-lg animate-pulse h-20"
              />
            ))}
          </div>
        ) : sessions.length === 0 ? (
          <div className="flex flex-col items-center text-center gap-4 py-16 border border-dashed border-outline-variant/40 rounded-xl">
            <span className="material-symbols-outlined text-[40px] text-on-surface-variant">
              history
            </span>
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface">
                No sessions yet
              </h3>
              <p className="text-body-md text-on-surface-variant mt-1">
                Start a session to see it show up here.
              </p>
            </div>
            <Link
              href="/session/new-session"
              className="inline-flex items-center gap-2 bg-primary text-on-primary rounded-lg px-4 py-2 font-label-md text-label-md"
            >
              Start a session
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {sessions.map((session) => {
              const isActive = session.status === "ACTIVE";
              const href = isActive
                ? "/session/active-session"
                : `/dashboard/sessions/${session.id}`;
              return (
                <Link
                  key={session.id}
                  href={href}
                  className="p-4 bg-surface-container-low border border-outline-variant/30 rounded-lg flex items-center gap-4 hover:border-primary/60 transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <span className="font-label-sm text-label-sm text-primary uppercase tracking-tighter">
                      {session.subject || "General Session"}
                    </span>
                    <h3 className="font-headline-md text-headline-md text-on-surface truncate">
                      {session.topic || session.goal || "Untitled Session"}
                    </h3>
                    <span className="text-label-sm text-on-surface-variant">
                      {isActive
                        ? `Started ${formatSessionTime(session.startedAt)}`
                        : `Ended ${formatSessionTime(session.endedAt || session.startedAt)}`}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded border ${
                      isActive
                        ? "text-primary bg-primary/10 border-primary/30"
                        : "text-on-surface-variant bg-surface-container-high border-outline-variant/40"
                    }`}
                  >
                    {session.status}
                  </span>
                  <span className="material-symbols-outlined text-on-surface-variant">
                    chevron_right
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
