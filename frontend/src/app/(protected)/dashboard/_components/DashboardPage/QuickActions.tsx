"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useDashboardData } from "../DashboardDataProvider";

export default function QuickActions() {
  const { resources, sessions, progress, isLoading } = useDashboardData();

  const stats = useMemo(
    () => [
      {
        icon: "bookmarks",
        title: "Bookmarks",
        description: `${resources.filter((resource) => resource.status === "READY").length} ready resources available for review.`,
        tone: "text-tertiary",
        href: "/dashboard/resources",
      },
      {
        icon: "history",
        title: "Recent Logs",
        description: `${progress?.totals?.transcriptChunks ?? sessions.reduce((total, session) => total + (session._count?.transcriptChunks ?? 0), 0)} transcript chunks recorded.`,
        tone: "text-on-secondary-container",
        href: undefined,
      },
    ],
    [progress?.totals?.transcriptChunks, resources, sessions]
  );

  if (isLoading) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-3 bg-surface-container-low border border-outline-variant/30 p-4 flex flex-col gap-2 animate-pulse min-h-32">
          <div className="h-6 w-6 bg-white/10 rounded" />
          <div className="h-5 w-32 bg-white/10 rounded" />
          <div className="h-4 w-full bg-white/10 rounded" />
        </div>
        <div className="md:col-span-2 flex flex-col gap-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={`quick-action-skeleton-${index}`}
              className="bg-surface-container-low border border-outline-variant/30 p-4 flex flex-col gap-2 animate-pulse"
            >
              <div className="h-5 w-24 bg-white/10 rounded" />
              <div className="h-4 w-full bg-white/10 rounded" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <Link
        href="/session/new-session"
        className="md:col-span-3 bg-surface-container-low border border-outline-variant/30 p-4 flex flex-col gap-2 justify-center hover:border-primary/60 hover:bg-surface-container transition-all"
      >
        <span className="material-symbols-outlined text-primary">
          upload_file
        </span>
        <h4 className="font-headline-md text-headline-md text-on-surface">
          Upload Data
        </h4>
        <p className="font-body-md text-body-md text-on-surface-variant">
          {resources.length} resources synced from the backend. Add more to
          start a new session.
        </p>
      </Link>

      <div className="md:col-span-2 flex flex-col gap-4">
        {stats.map((stat) => {
          const content = (
            <>
              <div className="flex items-center gap-2">
                <span className={`material-symbols-outlined text-[18px] ${stat.tone}`}>
                  {stat.icon}
                </span>
                <h4 className="font-label-md text-label-md text-on-surface">
                  {stat.title}
                </h4>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {stat.description}
              </p>
            </>
          );

          return stat.href ? (
            <Link
              key={stat.title}
              href={stat.href}
              className="flex-1 bg-surface-container-low border border-outline-variant/30 p-4 flex flex-col gap-1 justify-center hover:border-primary/60 hover:bg-surface-container transition-all"
            >
              {content}
            </Link>
          ) : (
            <div
              key={stat.title}
              className="flex-1 bg-surface-container-low border border-outline-variant/30 p-4 flex flex-col gap-1 justify-center"
            >
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
