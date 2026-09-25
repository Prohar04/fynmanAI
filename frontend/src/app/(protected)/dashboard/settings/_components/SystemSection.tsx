"use client";

import { useDashboardData } from "../../_components/DashboardDataProvider";

export default function SystemSection() {
  const { profile, progress } = useDashboardData();
  const activeSessions = progress?.totals?.activeSessions ?? 0;

  return (
    <section className="space-y-6 pt-6" id="system">
      <div className="pb-4 border-b border-outline-variant">
        <h3 className="font-headline-md text-headline-md text-on-surface">
          System
        </h3>
        <p className="text-body-md text-on-surface-variant">
          Current application and account status.
        </p>
      </div>
      <div className="space-y-4">
        <div className="p-4 bg-surface-container rounded border border-outline-variant space-y-1">
          <p className="font-medium text-on-surface">Theme</p>
          <p className="text-xs text-outline">
            Dark — the only theme available right now.
          </p>
        </div>
        <div className="p-4 bg-surface-container rounded border border-outline-variant space-y-1">
          <p className="font-medium text-on-surface">Session Status</p>
          <p className="text-xs text-outline">
            {activeSessions > 0
              ? `${activeSessions} active session${activeSessions === 1 ? "" : "s"} right now`
              : "No active sessions"}
          </p>
        </div>
        <div className="p-4 bg-surface-container rounded border border-outline-variant space-y-1">
          <p className="font-medium text-on-surface">Account Sync</p>
          <p className="text-xs text-outline">
            {profile?.emailVerified ? "Verified and active" : "Verification pending"}
            {profile?.location ? ` • ${profile.location}` : ""}
          </p>
        </div>
      </div>
    </section>
  );
}
