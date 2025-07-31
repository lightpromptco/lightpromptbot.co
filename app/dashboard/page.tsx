'use client'
import MoodMirror from '@/components/MoodMirror'
import BadgeProgress from '@/components/BadgeProgress'
import OctoLandSuggestions from '@/components/OctoLandSuggestions'
import ToolEngagement from '@/components/ToolEngagement'

export default function Dashboard() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-semibold mb-4 text-primary">Welcome to LightPrompt</h1>
      <MoodMirror />
      <BadgeProgress />
      <ToolEngagement />
      <OctoLandSuggestions />
    </div>
  )
}