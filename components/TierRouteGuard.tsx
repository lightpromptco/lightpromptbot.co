'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from './AuthProvider'
import { canAccessBot } from '@/lib/tierRouting'

export default function TierRouteGuard({ botName, children }: { botName: string, children: React.ReactNode }) {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/settings')
    } else {
      canAccessBot(user.id, botName).then((canAccess) => {
        if (!canAccess) router.push('/settings?upgrade=1')
      })
    }
  }, [user, botName, router])

  if (!user) return null
  return <>{children}</>
}