'use client'
import { useParams } from 'next/navigation'
import TierRouteGuard from '@/components/TierRouteGuard'
import BotChat from '@/components/BotChat'

export default function BotPage() {
  const { botName } = useParams()

  return (
    <TierRouteGuard botName={botName as string}>
      <div className="max-w-xl mx-auto py-8">
        <BotChat botName={botName as string} />
      </div>
    </TierRouteGuard>
  )
}