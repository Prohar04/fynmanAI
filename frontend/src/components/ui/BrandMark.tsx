export default function BrandMark({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 96" fill="none" className={className}>
      <path
        d="M48 24C40 18 28 16 16 18v46c12-2 24 0 32 6 8-6 20-8 32-6V18c-12-2-24 0-32 6Z"
        stroke="#bac3ff"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M48 24v46" stroke="#bac3ff" strokeWidth="2.5" />
      <path
        d="M70 14l2.5 5.5L78 22l-5.5 2.5L70 30l-2.5-5.5L62 22l5.5-2.5L70 14Z"
        fill="#f3aeff"
      />
    </svg>
  );
}
