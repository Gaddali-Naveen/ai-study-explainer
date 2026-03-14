export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": apiKey as string,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Explain ${topic} in simple terms for a student`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("FULL DATA:", JSON.stringify(data, null, 2));

    let text = "";

    if (
      data.candidates &&
      data.candidates.length > 0 &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts.length > 0
    ) {
      text = data.candidates[0].content.parts[0].text;
    }

    return Response.json({
      explanation: text || "No response from AI",
    });

  } catch (err) {
    console.log(err);

    return Response.json({
      explanation: "API Error",
    });
  }
}