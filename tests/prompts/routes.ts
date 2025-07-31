import { OpenAIStream, StreamingTextResponse } from 'ai';
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai-edge';
import { NextRequest } from 'next/server';
import { systemPrompt } from '@/lib/ai/prompts';
import { getUserTierFromHeaders } from '@/lib/auth/user-tier';
import { RequestHints } from '@/lib/ai/types';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, userId }: { messages: ChatCompletionRequestMessage[]; userId?: string } = body;

    const tier = getUserTierFromHeaders(req.headers); // e.g., 'free', 'plus', 'pro', 'b2b'
    const requestHints: RequestHints = {
      tier,
      userId: userId || null,
      product: 'lightprompt',
    };

    const prompt = systemPrompt({ selectedChatModel: 'gpt-4', requestHints });

    const fullMessages: ChatCompletionRequestMessage[] = [
      { role: 'system', content: prompt },
      ...messages,
    ];

    const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
    const openai = new OpenAIApi(config);

    const response = await openai.createChatCompletion({
      model: tier === 'free' ? 'gpt-3.5-turbo' : 'gpt-4',
      messages: fullMessages,
      temperature: 0.7,
      stream: true,
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (err) {
    console.error('[API ERROR]', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}
