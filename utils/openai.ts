export async function getAIResponse(message: string, context: string[] = []) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        ...context.map((c) => ({ role: 'user', content: c })),
        { role: 'user', content: message },
      ],
    }),
  });
  const data = await response.json();
  return data.choices?.[0]?.message?.content || "Sorry, I couldn't answer that.";
}