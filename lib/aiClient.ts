import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function explainTopic(topic: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `You are a friendly and knowledgeable teacher explaining concepts to students aged 12–16.

Explain the topic "${topic}" in simple, clear language that a student can easily understand.

Guidelines:
- Use plain English, no jargon unless you briefly define it
- Keep the explanation between 3–5 short paragraphs
- Include a simple real-world analogy if helpful
- End with one interesting fact or "did you know" to make it memorable
- Do NOT use markdown headers or bullet points — write in flowing paragraphs

Begin your explanation now:`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}
