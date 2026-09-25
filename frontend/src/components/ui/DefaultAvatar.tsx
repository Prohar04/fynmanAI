export default function DefaultAvatar({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      <rect width="64" height="64" fill="#33343e" />
      <circle cx="32" cy="25" r="12" fill="#8e8fa1" />
      <path d="M10 58c2-13 12-20 22-20s20 7 22 20" fill="#8e8fa1" />
    </svg>
  );
}
