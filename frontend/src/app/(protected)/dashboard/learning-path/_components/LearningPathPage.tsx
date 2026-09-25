"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDashboardData } from "../../_components/DashboardDataProvider";
import { useVoiceStore } from "@/store/useVoiceStore";
import type { DashboardTopicTrend } from "@/services/dashboard.service";

type RankedTopic = DashboardTopicTrend & { priority: number };

const rankTopics = (topics: DashboardTopicTrend[]): RankedTopic[] =>
  topics
    .map((topic) => {
      const coverage = topic.averageConceptCoverage ?? 0.5;
      const priority = (1 - coverage) * 0.6 + topic.topicDriftRate * 0.4;
      return { ...topic, priority };
    })
    .sort((a, b) => b.priority - a.priority);

const topMissedConcepts = (topic: DashboardTopicTrend, limit = 3) =>
  [...topic.missedConcepts]
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
    .map((entry) => entry.value);

export default function LearningPathPage() {
  const { trends, isLoading } = useDashboardData();
  const router = useRouter();

  const rankedTopics = useMemo(
    () => rankTopics(trends?.byTopic ?? []),
    [trends?.byTopic]
  );
  const focusTopics = rankedTopics.slice(0, 3);

  const practiceTopic = (topic: string) => {
    useVoiceStore.getState().setTopic(topic);
    router.push("/session/new-session");
  };

  return (
    <div className="h-[calc(100%-4rem)] overflow-y-auto custom-scrollbar-settings p-4 sm:p-6 md:p-8 bg-surface">
      <div className="max-w-3xl mx-auto space-y-8 pb-8">
        <div>
          <h1 className="font-headline-md text-headline-md text-on-surface">
            Learning Path
          </h1>
          <p className="text-body-md text-on-surface-variant">
            Built from your session evaluations — what to revisit, ranked by where your
            understanding is weakest.
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={`learning-path-skeleton-${index}`}
                className="h-28 bg-surface-container-low border border-outline-variant/30 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : rankedTopics.length === 0 ? (
          <div className="flex flex-col items-center text-center gap-4 py-16 border border-dashed border-outline-variant/40 rounded-xl">
            <span className="material-symbols-outlined text-[40px] text-on-surface-variant">
              auto_stories
            </span>
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface">
                No data yet
              </h3>
              <p className="text-body-md text-on-surface-variant mt-1">
                Finish a session with a final evaluation and your learning path will show up here.
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
          <>
            <section className="space-y-3">
              <h2 className="text-label-sm text-primary uppercase tracking-widest font-bold">
                Focus on next
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {focusTopics.map((topic) => {
                  const coveragePct = Math.round((topic.averageConceptCoverage ?? 0) * 100);
                  const missed = topMissedConcepts(topic);
                  return (
                    <div
                      key={topic.topic}
                      className="p-4 bg-surface-container-low border border-primary/30 rounded-lg flex flex-col gap-3"
                    >
                      <div>
                        <h3 className="font-headline-md text-headline-md text-on-surface truncate">
                          {topic.topic}
                        </h3>
                        <span className="text-label-sm text-on-surface-variant">
                          {coveragePct}% concept coverage
                        </span>
                      </div>
                      {missed.length > 0 && (
                        <ul className="text-body-sm text-on-surface-variant list-disc list-inside space-y-0.5">
                          {missed.map((concept) => (
                            <li key={concept} className="truncate">{concept}</li>
                          ))}
                        </ul>
                      )}
                      <button
                        type="button"
                        onClick={() => practiceTopic(topic.topic)}
                        className="mt-auto w-full bg-primary text-on-primary rounded-lg py-2 font-label-md text-label-md"
                      >
                        Practice this topic
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-label-sm text-on-surface-variant uppercase tracking-widest font-bold">
                All topics
              </h2>
              <div className="space-y-2">
                {rankedTopics.map((topic) => {
                  const coveragePct = Math.round((topic.averageConceptCoverage ?? 0) * 100);
                  return (
                    <div
                      key={topic.topic}
                      className="p-3 bg-surface-container-low border border-outline-variant/30 rounded-lg flex items-center gap-4"
                    >
                      <span className="flex-1 font-body-md text-body-md text-on-surface truncate">
                        {topic.topic}
                      </span>
                      <span className="text-label-sm text-on-surface-variant w-28 text-right">
                        {coveragePct}% coverage
                      </span>
                      <span className="text-label-sm text-on-surface-variant w-32 text-right">
                        {topic.evaluations} evaluation{topic.evaluations === 1 ? "" : "s"}
                      </span>
                      <button
                        type="button"
                        onClick={() => practiceTopic(topic.topic)}
                        className="text-primary text-label-sm hover:underline"
                      >
                        Practice
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
