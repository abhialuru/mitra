"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Page() {
  const [transcript, setTranscript] = useState<
    Array<{ role: string; content: string }>
  >([]);

  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("transcript");

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setTranscript(parsed);
      } catch (e) {
        console.error("Failed to parse transcript:", e);
      }
    }
  }, []);

  useEffect(() => {
    if (transcript.length === 0) {
      return;
    }

    if (transcript.length === 0) {
      return;
    }

    // Check if user spoke
    const userSpoken = transcript.some(
      (turn) => turn.role === "user" && turn.content.trim().length > 0
    );

    if (!userSpoken) {
      console.log("User did not speak, skipping feedback call");
      setTranscript([]);
      return;
    }

    async function handleFeedback() {
      try {
        setLoading(true);

        const response = await fetch("/api/get-feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ transcript }),
        });

        const data = await response.json();

        if (response.ok) {
          setFeedback(data.feedback);
        }
      } catch (error) {
        console.log("error getting feedback", error);
      } finally {
        setLoading(false);
      }
    }

    handleFeedback();
  }, [transcript]);

  function cleanFeedback(text: string) {
    return text.replace(/#+\s*/g, "").replace(/\*\*/g, "");
  }

  return (
    <div className="p-5 pb-10">
      <div className="w-full pb-5 flex justify-between items-center">
        <Link className="cursor-pointer" href="/">
          <div className="text-violet-700 text-2xl font-bold">Mitra</div>
        </Link>
        <div className="flex gap-2 md:gap-8">
          <Link className="cursor-pointer" href="/meet">
            <button className="w-fit p-3 rounded-lg bg-violet-700 text-white cursor-pointer">
              Start a conversation
            </button>
          </Link>
          <Link className="cursor-pointer" href="/">
            <button className="w-fit p-3 border rounded-lg">Home</button>
          </Link>
        </div>
      </div>
      <h1 className="text-xl font-bold mb-4">Feedback</h1>
      {loading ? (
        <div className="w-full my-24 flex flex-col justify-center items-center gap-4">
          <div className="text-lg animate-pulse">
            Our AI is generating feedback...
          </div>
          <Loader2 className="size-7 animate-spin text-violet-700" />
        </div>
      ) : transcript.length === 0 ? (
        <p>
          Please have a proper conversation with Mitra (AI Mentor) to get
          feedback.
        </p>
      ) : (
        <ul className="space-y-2">
          {feedback && (
            <div style={{ whiteSpace: "pre-wrap", marginTop: "1rem" }}>
              {cleanFeedback(feedback)}
            </div>
          )}
        </ul>
      )}
    </div>
  );
}

export default Page;
