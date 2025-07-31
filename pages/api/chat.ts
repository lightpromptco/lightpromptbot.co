import type { NextApiRequest, NextApiResponse } from 'next';
import { getAIResponse } from '../../utils/openai';
import supabase from '../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { message, userId } = req.body;

  // Optionally fetch context or FAQ from Sanity
  // import sanity from '../../lib/sanity';
  // const faq = await sanity.fetch(/* your query */);

  const aiResponse = await getAIResponse(message);

  // Store chat in Supabase
  if (userId) {
    await supabase.from('chats').insert([{ user_id: userId, message, response: aiResponse }]);
  }

  res.status(200).json({ response: aiResponse });
}