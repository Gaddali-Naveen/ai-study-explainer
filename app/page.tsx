"use client";

import { useState } from "react";
import TopicInput from "@/components/TopicInput";
import ExplanationCard from "@/components/ExplanationCard";
import LoadingState from "@/components/LoadingState";

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; topic: string; explanation: string }
  | { status: "error"; message: string };

export default function Home() {
  const [state, setState] = useState<State>({ status: "idle" });

  const handleSubmit = async (topic: string) => {
    setState({ status: "loading" });

    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();

      if (!res.ok) {
        setState({ status: "error", message: data.error || "Something went wrong." });
        return;
      }

      setState({ status: "success", topic, explanation: data.explanation });
    } catch {
      setState({
        status: "error",
        message: "Network error. Please check your connection and try again.",
      });
    }
  };

  return (
    <main className="min-h-screen px-4 py-16 flex flex-col items-center">
      {/* Decorative background blobs */}
      <div
        className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #e8643a 0%, transparent 70%)" }}
      />
      <div
        className="fixed bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, #5a8a72 0%, transparent 70%)" }}
      />

      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1a1a2e]/15 bg-white/50 text-xs text-[#1a1a2e]/50 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5a8a72] animate-[pulseSoft_2s_ease-in-out_infinite]" />
            Powered by Gemini AI
          </div>

          <h1
            className="text-5xl font-black text-[#1a1a2e] leading-tight mb-4"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            Study Topic
            <br />
            <span className="text-[#e8643a]">Explainer</span>
          </h1>

          <p className="text-[#1a1a2e]/55 text-lg max-w-md mx-auto leading-relaxed">
            Enter any topic and get a clear, student-friendly explanation in seconds.
          </p>
        </header>

        {/* Input area */}
        <TopicInput
          onSubmit={handleSubmit}
          isLoading={state.status === "loading"}
        />

        {/* Result area */}
        {state.status === "loading" && <LoadingState />}

        {state.status === "error" && (
          <div className="mt-8 px-6 py-5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm animate-[fadeUp_0.4s_ease_forwards]">
            <strong>Oops!</strong> {state.message}
          </div>
        )}

        {state.status === "success" && (
          <ExplanationCard
            topic={state.topic}
            explanation={state.explanation}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="mt-20 text-center text-xs text-[#1a1a2e]/30 relative z-10">
        Built with Next.js · Gemini AI · Tailwind CSS
      </footer>
    </main>
  );
}
