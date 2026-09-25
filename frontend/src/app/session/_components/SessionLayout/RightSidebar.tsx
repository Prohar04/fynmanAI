"use client";

import { useEffect, useState } from "react";
import { useVoiceStore } from "@/store/useVoiceStore";

interface RightSidebarProps {
  isActiveSession: boolean;
  onOpenArtcraft: () => void;
}

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export default function RightSidebar({
  isActiveSession,
  onOpenArtcraft,
}: RightSidebarProps) {
  const transcriptCount = useVoiceStore((state) => state.transcripts.length);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (!isActiveSession) {
      setElapsedSeconds(0);
      return undefined;
    }

    const interval = window.setInterval(() => {
      setElapsedSeconds((current) => current + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isActiveSession]);

  return (
    <div className="pt-14 p-6 flex flex-col gap-8 h-full custom-scrollbar-transparent overflow-y-auto">
      {!isActiveSession && (
        <div className="flex flex-col items-center text-center gap-2 py-10 text-on-surface-variant">
          <span className="material-symbols-outlined text-[28px] opacity-60">
            draw
          </span>
          <p className="text-body-sm">
            Session tools — the sketchpad and live stats — show up here once you start.
          </p>
        </div>
      )}

      {/* Artcraft — active session only */}
      {isActiveSession && (
        <div className="flex flex-col gap-4">
          <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest border-b border-outline-variant pb-1">
            Artcraft
          </h3>
          <button
            className="flex items-center justify-between p-2 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/30 transition-all group"
            onClick={onOpenArtcraft}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                draw
              </span>
              <span className="font-body-md text-body-md text-on-surface">
                Visual Sketchpad
              </span>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant text-sm group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>
      )}

      {/* Session stats — active session only */}
      {isActiveSession && (
        <div className="mt-auto pt-8">
          <div className="p-4 rounded-xl bg-surface-container-lowest/50 border border-outline-variant flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Session Duration
              </span>
              <span className="font-label-md text-label-md text-on-surface">
                {formatDuration(elapsedSeconds)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Exchanges
              </span>
              <span className="font-label-md text-label-md text-on-surface">
                {transcriptCount}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
