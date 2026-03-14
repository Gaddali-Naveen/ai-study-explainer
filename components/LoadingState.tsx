"use client";

export default function LoadingState() {
  return (
    <div className="mt-8 p-8 rounded-3xl border border-[#1a1a2e]/10 bg-white/80 backdrop-blur-sm">
      {/* Animated label + title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="shimmer h-6 w-14 rounded-full" />
        <div className="shimmer h-7 w-48 rounded-lg" />
      </div>

      {/* Divider */}
      <div className="h-px bg-[#1a1a2e]/8 mb-6" />

      {/* Skeleton paragraphs */}
      <div className="space-y-3">
        {[100, 90, 95, 75, 85].map((w, i) => (
          <div
            key={i}
            className="shimmer h-4 rounded"
            style={{ width: `${w}%` }}
          />
        ))}
      </div>

      {/* Status text */}
      <p className="mt-6 text-sm text-[#1a1a2e]/50 animate-[pulseSoft_2s_ease-in-out_infinite]">
        Generating explanation…
      </p>
    </div>
  );
}
