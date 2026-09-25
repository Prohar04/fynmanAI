import BrandMark from "@/components/ui/BrandMark";

export default function BrandHeader() {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="w-32 h-32 flex items-center justify-center mb-4">
        <BrandMark />
      </div>
      <h1 className="text-display text-on-surface tracking-tighter">FymenAI</h1>
      <p className="text-body-md text-on-surface-variant mt-1 opacity-60">
        AI tutoring, grounded in your own material.
      </p>
    </div>
  );
}
