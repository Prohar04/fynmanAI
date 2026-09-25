"use client";

import { useAuth } from "@/context/auth/AuthContext";
import TopNav from "@/components/landing/TopNav";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useDashboardData } from "./DashboardDataProvider";
import DefaultAvatar from "@/components/ui/DefaultAvatar";

type DashboardShellClientProps = {
  children: ReactNode;
};

export default function DashboardShellClient({
  children,
}: DashboardShellClientProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const { trends, progress, isLoading } = useDashboardData();
  const isDashboard = pathname === "/dashboard";
  const headerOffsetClass = isDashboard ? "pt-12" : "pt-16";
  const avatarSrc = user?.avatarUrl;
  const topTopic = trends?.byTopic?.[0]?.topic;
  const consistency = progress?.averages?.confidenceScore;

  const pageTitle = pathname.startsWith("/dashboard/settings")
    ? "Settings"
    : pathname.startsWith("/dashboard/resources")
      ? "Resources"
      : pathname.startsWith("/dashboard/sessions")
        ? "Sessions"
        : pathname.startsWith("/dashboard/learning-path")
          ? "Learning Path"
          : "Dashboard";

  return (
    <>
       <header
        className={
          isDashboard
            ? "fixed top-0 left-0 md:left-70 right-0 h-12 bg-surface-container-low border-b border-outline-variant px-6 items-center justify-between z-40 hidden md:flex"
            : "fixed top-0 left-0 md:left-70 right-0 h-16 bg-surface flex justify-between items-center px-6 z-40 border-b border-outline-variant"
        }
      >
        {isDashboard ? (
          <>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-primary uppercase tracking-widest font-bold">
                  Focus:
                </span>
                <span className="font-body-md text-body-md text-on-surface">
                  {topTopic || "General"}
                </span>
              </div>
              {typeof consistency === "number" && (
                <div className="hidden md:flex items-center gap-2 pl-4 border-l border-outline-variant/40">
                  <span className="text-[10px] text-tertiary-container uppercase tracking-widest font-bold">
                    Consistency:
                  </span>
                  <span className="font-body-md text-body-md text-on-surface-variant">
                    {Math.round(consistency)}%
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full bg-primary ${isLoading ? "animate-pulse" : ""}`}
              />
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {isLoading ? "Syncing..." : "Synced"}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-4">
              <h2 className="font-headline-md text-base md:text-headline-md text-on-surface">
                {pageTitle}
              </h2>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <button className="text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">
                    notifications_none
                  </span>
                </button>
                <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
                  {avatarSrc ? (
                    <Image
                      src={avatarSrc}
                      alt={user?.name || "Avatar"}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <DefaultAvatar />
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </header>

      <div className={`h-full ${headerOffsetClass}`}>{children}</div>
    </>
  );
}
