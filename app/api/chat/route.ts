import { NextRequest } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { botPrompts } from '@/lib/prompts'
import { canAccessBot } from '@/lib/tierRouting'
import OpenAI from 'openai'

export async function POST(req: NextRequest) {
  const { botName, message, userId } = await req.json()
  if (!(await canAccessBot(userId, botName))) {
    return Response.json({ error: 'Upgrade required' }, { status: 403 })
  }
  const prompt = botPrompts[botName]
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })
  const aiRes = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: prompt },
      { role: 'user', content: message },
    ],
  })
  // Optionally log chat to Supabase here
  return Response.json({ response: aiRes.choices[0].message.content })
}