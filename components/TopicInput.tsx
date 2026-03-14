"use client";

import { useState, KeyboardEvent } from "react";

interface TopicInputProps {
  onSubmit: (topic: string) => void;
  isLoading: boolean;
}

const EXAMPLE_TOPICS = [
  "Newton's Laws",
  "Photosynthesis",
  "Binary Search",
  "World War II",
  "The Water Cycle",
  "DNA and Genetics",
];

export default function TopicInput({ onSubmit, isLoading }: TopicInputProps) {
  const [topic, setTopic] = useState("");

  const handleSubmit = () => {
    const trimmed = topic.trim();
    if (!trimmed || isLoading) return;
    onSubmit(trimmed);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  const handleExample = (example: string) => {
    setTopic(example);
    onSubmit(example);
  };

  return (
    <div className="w-full">
      {/* Input row */}
      <div className="flex gap-3">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. Photosynthesis, Newton's Laws..."
          disabled={isLoading}
          className="
            flex-1 px-5 py-4 rounded-2xl border-2 border-[#1a1a2e]/20
            bg-white/70 backdrop-blur-sm text-[#1a1a2e] text-base
            placeholder:text-[#1a1a2e]/35 font-[family-name:var(--font-body)]
            focus:outline-none focus:border-[#e8643a] focus:bg-white
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200
          "
          maxLength={200}
          aria-label="Study topic"
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading || !topic.trim()}
          className="
            px-7 py-4 rounded-2xl font-medium text-base
            bg-[#1a1a2e] text-[#f5f0e8]
            hover:bg-[#e8643a] active:scale-95
            disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#1a1a2e]
            transition-all duration-200 whitespace-nowrap
            font-[family-name:var(--font-body)]
          "
        >
          {isLoading ? "Thinking…" : "Explain Topic"}
        </button>
      </div>

      {/* Example chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-xs text-[#1a1a2e]/40 self-center mr-1">Try:</span>
        {EXAMPLE_TOPICS.map((ex) => (
          <button
            key={ex}
            onClick={() => handleExample(ex)}
            disabled={isLoading}
            className="
              text-xs px-3 py-1.5 rounded-full border border-[#1a1a2e]/15
              text-[#1a1a2e]/60 hover:border-[#e8643a] hover:text-[#e8643a]
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-all duration-150 bg-white/50
            "
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  );
}
