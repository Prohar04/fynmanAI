import { useEffect, useMemo, useState } from "react";
import BrandMark from "@/components/ui/BrandMark";

const BAR_COUNT = 96;

interface AIAvatarProps {
  isRecording: boolean;
  isProcessing: boolean;
  waveformLevel: number;
}

const clampLevel = (value: number) => Math.min(1, Math.max(0.08, value));
const BASE_HEIGHT = 4;

export default function AIAvatar({
  isRecording,
  isProcessing,
  waveformLevel,
}: AIAvatarProps) {
  const [progress, setProgress] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);

  const showWaveform = isRecording || isProcessing;

  // Progress drives wave motion — stops when recording stops (freeze on stop)
  useEffect(() => {
    if (!isRecording) return undefined;

    let frame = 0;
    const tick = () => {
      setProgress((current) => current + 0.06);
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [isRecording]);

  // Reveal bars left→right on waveform open, reset on close
 useEffect(() => {
  if (!showWaveform) {
    setVisibleCount(0);
    return undefined;
  }

  if (!isRecording) return undefined; // ← ADD THIS — stops reveal when recording stops

  if (visibleCount >= BAR_COUNT) return undefined;

  const timer = setTimeout(() => {
    setVisibleCount((prev) => Math.min(prev + 1, BAR_COUNT));
  }, 100);

  return () => clearTimeout(timer);
}, [showWaveform, isRecording, visibleCount]); // ← add isRecording to deps

  const renderedBars = useMemo(() => {
      const envelope = clampLevel(isRecording ? waveformLevel : 0);

    return Array.from({ length: BAR_COUNT }).map((_, index) => {
      const phase = progress * 0.45 + index * 0.24;
      const carrier = (Math.sin(phase) + 1) / 2;
      const shimmer = (Math.sin(phase * 1.9 + index * 0.05) + 1) / 2;
      const pulse = 0.15 + carrier * 0.65 + shimmer * 0.2;
      const height = BASE_HEIGHT + envelope * pulse * 120;

      const revealed = index >= BAR_COUNT - visibleCount;

      return {
        height: revealed ? height : BASE_HEIGHT,
        opacity: revealed ? 0.45 + envelope * (0.2 + carrier * 0.35) : 0,
        scale: revealed ? 0.92 + shimmer * 0.1 : 1,
      };
    });
  }, [progress, waveformLevel, visibleCount, isRecording]);

  return (
    <div className="mt-8 flex w-full flex-col">
      <div className="mx-auto flex h-14 w-18 items-center justify-center overflow-hidden rounded-full border border-primary/20 bg-surface-container-high shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
        <BrandMark className="h-8 w-8 opacity-80" />
      </div>

      <div className="mb-10 w-full">
        <div
          className="flex h-36 w-full items-end"
          style={{ gap: "2px" }}
        >
          {renderedBars.map((bar, index) => (
            <div
              key={`wave-sample-${index}`}
              className="wave-strip flex-1 rounded-full bg-neutral-700/90"
              style={{
                minWidth: 0,
                height: `${bar.height}px`,
                opacity: bar.opacity,
                transform: `scaleY(${bar.scale})`,
                transformOrigin: "bottom",
                transition: "opacity 0.06s ease-out",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}