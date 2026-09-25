"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth/AuthContext";
import {
  fetchDashboardSessionDetail,
  fetchDashboardSessionReport,
  type DashboardSession,
  type DashboardSessionReport,
} from "@/services/dashboard.service";

const formatDateTime = (value?: string | null) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export default function SessionDetailPage({ sessionId }: { sessionId: string }) {
  const { accessToken } = useAuth();
  const [session, setSession] = useState<DashboardSession | null>(null);
  const [report, setReport] = useState<DashboardSessionReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!accessToken) return;

    let cancelled = false;
    setIsLoading(true);
    setNotFound(false);

    Promise.all([
      fetchDashboardSessionDetail(accessToken, sessionId),
      fetchDashboardSessionReport(accessToken, sessionId),
    ])
      .then(([sessionResult, reportResult]) => {
        if (cancelled) return;
        if (!sessionResult) {
          setNotFound(true);
          return;
        }
        setSession(sessionResult);
        setReport(reportResult);
      })
      .catch(() => {
        if (!cancelled) setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [accessToken, sessionId]);

  return (
    <div className="h-[calc(100%-4rem)] overflow-y-auto custom-scrollbar-settings p-4 sm:p-6 md:p-8 bg-surface">
      <div className="max-w-3xl mx-auto space-y-6 pb-8">
        <Link
          href="/dashboard/sessions"
          className="inline-flex items-center gap-1 text-label-md text-on-surface-variant hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to sessions
        </Link>

        {isLoading ? (
          <div className="space-y-3">
            <div className="h-24 bg-surface-container-low border border-outline-variant/30 rounded-lg animate-pulse" />
            <div className="h-48 bg-surface-container-low border border-outline-variant/30 rounded-lg animate-pulse" />
          </div>
        ) : notFound || !session ? (
          <div className="flex flex-col items-center text-center gap-3 py-16 border border-dashed border-outline-variant/40 rounded-xl">
            <span className="material-symbols-outlined text-[40px] text-on-surface-variant">
              search_off
            </span>
            <h3 className="font-headline-md text-headline-md text-on-surface">
              Session not found
            </h3>
            <p className="text-body-md text-on-surface-variant">
              It may have been removed, or belongs to a different account.
            </p>
          </div>
        ) : (
          <>
            <div className="p-6 bg-surface-container-low border border-outline-variant/30 rounded-lg">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-label-sm text-label-sm text-primary uppercase tracking-tighter">
                    {session.subject || "General Session"}
                  </span>
                  <h1 className="font-headline-md text-headline-md text-on-surface">
                    {session.topic || session.goal || "Untitled Session"}
                  </h1>
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded border text-on-surface-variant bg-surface-container-high border-outline-variant/40">
                  {session.status}
                </span>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-1 mt-4 text-label-sm text-on-surface-variant">
                <span>Started {formatDateTime(session.startedAt)}</span>
                <span>Ended {formatDateTime(session.endedAt)}</span>
                {typeof session._count?.transcriptChunks === "number" && (
                  <span>{session._count.transcriptChunks} transcript chunks</span>
                )}
              </div>
            </div>

            <div className="p-6 bg-surface-container-low border border-outline-variant/30 rounded-lg">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
                Report
              </h2>
              {!report ? (
                <p className="text-body-md text-on-surface-variant">
                  No final report has been generated for this session yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {typeof report.confidenceScore === "number" && (
                    <div className="flex items-center justify-between">
                      <span className="text-label-md text-on-surface-variant">
                        Confidence score
                      </span>
                      <span className="text-label-md text-primary font-bold">
                        {Math.round(report.confidenceScore)}%
                      </span>
                    </div>
                  )}
                  {report.summary && (
                    <p className="text-body-md text-on-surface">{report.summary}</p>
                  )}
                  {report.strengths && report.strengths.length > 0 && (
                    <div>
                      <h3 className="text-label-sm text-primary uppercase tracking-widest font-bold mb-2">
                        Strengths
                      </h3>
                      <ul className="list-disc list-inside text-body-sm text-on-surface-variant space-y-1">
                        {report.strengths.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {report.weaknesses && report.weaknesses.length > 0 && (
                    <div>
                      <h3 className="text-label-sm text-tertiary-container uppercase tracking-widest font-bold mb-2">
                        Weaknesses
                      </h3>
                      <ul className="list-disc list-inside text-body-sm text-on-surface-variant space-y-1">
                        {report.weaknesses.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {report.missedConcepts && report.missedConcepts.length > 0 && (
                    <div>
                      <h3 className="text-label-sm text-error uppercase tracking-widest font-bold mb-2">
                        Missed concepts
                      </h3>
                      <ul className="list-disc list-inside text-body-sm text-on-surface-variant space-y-1">
                        {report.missedConcepts.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
