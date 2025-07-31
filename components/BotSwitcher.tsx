'use client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const bots = [
  { name: 'LightPromptBot', label: 'Reflection', icon: '/lightprompt-logo.png' },
  { name: 'BodyMirror', label: 'Wellness', icon: '/bodymirror-icon.png' },
  // ...add all bots here
]

export default function BotSwitcher({ currentBot }: { currentBot: string }) {
  const router = useRouter()
  return (
    <nav className="flex gap-2 mb-4">
      {bots.map(bot => (
        <button
          key={bot.name}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl ${bot.name === currentBot ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
          onClick={() => router.push(`/bots/${bot.name}`)}
        >
          <Image src={bot.icon} alt={bot.label} width={24} height={24} />
          <span>{bot.label}</span>
        </button>
      ))}
    </nav>
  )
}