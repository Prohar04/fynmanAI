export default function GraphIllustration({ className = "h-full w-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" fill="none" className={className}>
      <g stroke="#c0c1ff" strokeWidth="1" opacity="0.35">
        <line x1="200" y1="200" x2="90" y2="120" />
        <line x1="200" y1="200" x2="310" y2="110" />
        <line x1="200" y1="200" x2="330" y2="230" />
        <line x1="200" y1="200" x2="260" y2="330" />
        <line x1="200" y1="200" x2="110" y2="300" />
        <line x1="200" y1="200" x2="70" y2="220" />
        <line x1="90" y1="120" x2="70" y2="220" />
        <line x1="310" y1="110" x2="330" y2="230" />
        <line x1="260" y1="330" x2="110" y2="300" />
      </g>
      <g fill="#c0c1ff">
        <circle cx="200" cy="200" r="10" opacity="0.9" />
        <circle cx="90" cy="120" r="5" opacity="0.6" />
        <circle cx="310" cy="110" r="6" opacity="0.6" />
        <circle cx="330" cy="230" r="5" opacity="0.5" />
        <circle cx="260" cy="330" r="6" opacity="0.55" />
        <circle cx="110" cy="300" r="5" opacity="0.5" />
        <circle cx="70" cy="220" r="4" opacity="0.45" />
      </g>
    </svg>
  );
}
