import { getUserTier } from './userUtils'

const accessMap: Record<string, string[]> = {
  free: ['LightPromptBot', 'BodyMirror'],
  paid: [
    'LightPromptBot', 'BodyMirror', 'GeoPrompt', 'DreamWeaver', 'LunaLog',
    'VisionQuest', 'LightPrompt:Ed', 'GuardianTag', 'VibeMatch'
  ],
}

export async function canAccessBot(userId: string, bot: string) {
  const tier = await getUserTier(userId)
  return accessMap[tier]?.includes(bot)
}