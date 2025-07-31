import { supabase } from '@/lib/supabaseClient';
import { botPrompts } from '@/lib/prompts';
import { canAccessBot } from '@/lib/tierRouting';
import { OpenAI } from 'openai';

export async function POST(req: Request) {
  const { botName, message, userId } = await req.json();
  if (!(await canAccessBot(userId, botName))) {
    return new Response(JSON.stringify({ error: 'Upgrade required' }), { status: 403 });
  }
  const prompt = botPrompts[botName];
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
  const aiRes = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'system', content: prompt }, { role: 'user', content: message }],
  });
  return new Response(JSON.stringify({ response: aiRes.choices[0].message.content }));
}