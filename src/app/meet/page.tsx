"use client";
import { vapi } from "@/lib/vapi";
import { Phone, PhoneOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const [callActive, setCallActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<
    Array<{ role: string; content: string }>
  >([]);
  const [callEnd, setCallEnd] = useState(false);

  console.log("transcript", transcript);

  const router = useRouter();

  useEffect(() => {
    function handleCallStart() {
      console.log("Call started");

      setCallActive(true);
      setIsConnecting(false);
      setCallEnd(false);
    }

    function handleCallEnd() {
      console.log("Call ended");

      setCallActive(false);
      setIsSpeaking(false);
      setIsConnecting(false);
      setCallEnd(true);
    }

    function handleSpeechStart() {
      console.log("AI started speaking");

      setIsSpeaking(true);
    }

    function handleSpeechEnd() {
      console.log("AI Stopped speaking");

      setIsSpeaking(false);
    }

    function handleTranscript(message: any) {
      if (message.type === "transcript" && message.transcriptType === "final") {
        console.log("message", message);

        const newMessage = { role: message.role, content: message.transcript };
        setTranscript((prev) => [...prev, newMessage]);
      }
    }

    function handleError(error: any) {
      console.log("Vapi errors", error);
      setIsConnecting(false);
      setCallActive(false);
    }

    vapi
      .on("call-start", handleCallStart)
      .on("call-end", handleCallEnd)
      .on("speech-start", handleSpeechStart)
      .on("speech-end", handleSpeechEnd)
      .on("message", handleTranscript)
      .on("error", handleError);

    return () => {
      vapi
        .off("call-start", handleCallStart)
        .off("call-end", handleCallEnd)
        .off("speech-start", handleSpeechStart)
        .off("speech-end", handleSpeechEnd)
        .off("message", handleTranscript)
        .off("error", handleError);
    };
  }, []);

  async function handleMeeting() {
    if (callActive) {
      await vapi.stop();
      return;
    }

    try {
      setIsConnecting(true);
      setTranscript([]);
      setCallEnd(false);

      await vapi.start(
        undefined,
        undefined,
        undefined,
        process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!
      );
    } catch (error) {
      console.log("Failed to call", error);
      setIsConnecting(false);
    }
  }

  const Icon = callActive ? PhoneOff : Phone;

  useEffect(() => {
    if (callEnd && transcript.length > 0) {
      sessionStorage.setItem("transcript", JSON.stringify(transcript));
      router.push("/feedback");
    }
  }, [callEnd, transcript]);

  return (
    <div className="w-full h-[100vh] p-5">
      <Link href="/">
        <div className="text-lg font-bold text-white p-2 px-5 rounded-full bg-violet-700 flex justify-center items-center gap-2 absolute top-10 left-10 z-10">
          <span className="size-2.5 rounded-full bg-green-500 inline-block" />
          Mitra
        </div>
      </Link>
      {!callActive && (
        <div className="text-black p-2 px-5 rounded-full bg-white flex justify-center items-center gap-2 absolute  top-10 right-10 z-10">
          Calltime : around 5 Mins
        </div>
      )}
      <div className="w-full h-full bg-[#1a1a1a] rounded-3xl flex justify-center items-center relative">
        <div className="size-[14vw] rounded-full relative flex justify-center items-center">
          <div
            className={`absolute size-[10vw] bg-gray-400 rounded-full z-0 ${
              isSpeaking && "animate-ping"
            }`}
          ></div>
          <Image
            className="w-full h-full object-cover rounded-full absolute z-10"
            src="/ai-agent.jpeg"
            alt="ai_avatar"
            width={150}
            height={150}
          />
        </div>
        {isConnecting ? (
          <div
            onClick={handleMeeting}
            className="text-white text-lg  p-3 px-10 rounded-full bg-black absolute bottom-10 flex justify-center items-center cursor-wait  "
          >
            <span className="animate-pulse">Connecting...</span>
          </div>
        ) : (
          <div
            onClick={handleMeeting}
            className={`text-white text-lg  p-3 px-6 rounded-full absolute bottom-10 flex justify-center items-center gap-3 cursor-pointer ${
              !callActive ? "bg-green-400" : "bg-red-500"
            }`}
          >
            {callActive ? "End the call" : "Start the call"}
            <Icon className="size-5 text-white" fill="#ffffff" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
