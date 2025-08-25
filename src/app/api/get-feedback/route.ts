import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

type TranscriptTurn = {
  role: string;
  content: string;
};

const geminiAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { transcript } = await req.json();

    if (transcript.length === 0) {
      return NextResponse.json(
        { error: "No transcript provided" },
        { status: 400 }
      );
    }

    const userMessages = transcript
      .filter(
        (turn: TranscriptTurn) =>
          turn.role === "user" && turn.content.trim().length > 0
      )
      .map((turn: TranscriptTurn) => turn.content.trim())
      .join("\n");

    const model = geminiAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are a professional English language mentor helping beginner to intermediate learners. Review the following conversation between a user and an AI mentor. Focus only on the user's parts in the conversation.

Use simple, clear, and easy-to-understand English in your feedback. Avoid difficult vocabulary, complex grammar, or long sentences. Write like you are speaking to someone who is still learning English. Be supportive and friendly.

Give your feedback in 4 clearly separated sections. Use bullet points for the first three sections, and write the summary as a short paragraph.

1. Pros in the Conversation  
List what the user did well, such as using good vocabulary, clear sentences, or speaking with confidence.

2. Cons in the Conversation  
Gently point out mistakes or areas for improvement, like grammar, sentence structure, or unclear words. Be kind and simple.

3. Tips to Improve English  
Give practical tips the user can follow to improve. Keep your advice simple, clear, and direct.

4. Summary of Feedback  
Write 3-4 short sentences to summarize the user's performance. Encourage them and suggest the next step.

Here is what the user said:
${userMessages}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const feedback = response.text();

    return NextResponse.json({ feedback });
  } catch (error) {
    console.log("Gemini feedback error", error);
    return NextResponse.json(
      { error: "Gemini failed to generate feedback" },
      { status: 500 }
    );
  }
}
