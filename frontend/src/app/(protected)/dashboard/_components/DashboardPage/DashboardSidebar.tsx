"use client";

import { useMemo } from "react";
import { useDashboardData } from "../DashboardDataProvider";
import GraphIllustration from "@/components/ui/GraphIllustration";

export default function DashboardSidebar() {
  const { progress, trends, resources, isLoading } = useDashboardData();

  const consistency = progress?.averages?.confidenceScore ?? 0;
  const topTopic = trends?.byTopic?.[0];
  const suggestedActions = useMemo(() => {
    const missedConcept = trends?.trend?.find((point) => point.missedConcepts.length)
      ?.missedConcepts[0];
    return [
      missedConcept
        ? `Re-evaluate ${missedConcept} across recent sessions`
        : "Re-evaluate the latest session transcript",
      topTopic
        ? `Synthesize follow-up notes for ${topTopic.topic}`
        : "Synthesize the latest resource summary",
      resources.length
        ? `Update knowledge base from ${resources.length} synced resource${resources.length === 1 ? "" : "s"}`
        : "Update knowledge base from the latest upload",
    ];
  }, [resources.length, topTopic, trends?.trend]);

  return (
    <aside className="hidden lg:flex fixed right-0 top-0 h-screen w-80 bg-surface-container-low border-l border-outline-variant flex-col p-6 gap-6 overflow-y-auto custom-scrollbar">
      <div className="flex flex-col gap-2">
        <span className="text-[10px] text-primary uppercase tracking-widest font-bold">
          Session Intelligence
        </span>
        <div className="p-4 bg-surface-container border border-outline-variant/30 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">
              Logical Consistency
            </span>
            <span className="font-label-md text-label-md text-primary">
              {isLoading ? "..." : `${Math.round(consistency)}%`}
            </span>
          </div>
          <div className="w-full h-1 bg-surface-container-high">
            <div
              className="h-full bg-primary"
              style={{ width: `${Math.max(0, Math.min(100, consistency))}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[10px] text-primary uppercase tracking-widest font-bold">
          Knowledge Graph
        </span>
        <div className="aspect-square w-full bg-surface-container border border-outline-variant/30 relative overflow-hidden p-6">
          <GraphIllustration />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[10px] text-tertiary-container uppercase tracking-widest font-bold">
          Suggested Actions
        </span>
        <div className="flex flex-col gap-1">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={`suggested-action-skeleton-${index}`}
                  className="p-2 text-on-surface-variant font-body-md text-body-md border-l border-transparent pl-4 transition-all animate-pulse"
                >
                  <div className="h-4 w-full bg-white/10 rounded" />
                </div>
              ))
            : suggestedActions.map((action) => (
            <div
              key={action}
              className="p-2 text-on-surface-variant font-body-md text-body-md border-l border-outline-variant/30 pl-4"
            >
              • {action}
            </div>
            ))}
        </div>
      </div>

      <div className="mt-auto p-4 bg-surface-container border border-primary/30 rounded-lg">
        <p className="font-label-sm text-label-sm text-on-surface italic">
          &ldquo;If you can&apos;t explain it simply, you don&apos;t understand it well enough.&rdquo;
        </p>
        <div className="mt-2 text-[10px] text-primary uppercase font-bold">
          — Richard Feynman
        </div>
      </div>
    </aside>
  );
}
