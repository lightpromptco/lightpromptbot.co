'use client'
import { useState } from 'react'
import { useUser } from './AuthProvider'

export default function BotChat({ botName }: { botName: string }) {
  const [messages, setMessages] = useState<{ role: string, content: string }[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const { user } = useUser()

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    setLoading(true)
    setMessages((msgs) => [...msgs, { role: 'user', content: input }])
    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ botName, message: input, userId: user?.id }),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await res.json()
    setMessages((msgs) => [...msgs, { role: 'user', content: input }, { role: 'assistant', content: data.response }])
    setInput('')
    setLoading(false)
  }

  return (
    <div className="bg-white dark:bg-gray-900 shadow-soft rounded-xl p-6">
      <div className="h-64 overflow-y-auto mb-4 flex flex-col gap-2">
        {messages.map((m, i) => (
          <div key={i} className={`p-2 rounded-xl ${m.role === 'user' ? 'self-end bg-accent text-black' : 'self-start bg-gray-100 dark:bg-gray-800 text-primary'}`}>
            {m.content}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          className="flex-1 p-2 rounded-xl border focus:outline-primary"
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={loading}
          placeholder="Type your reflection…"
        />
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded-xl" disabled={loading || !input}>
          Send
        </button>
      </form>
    </div>
  )
}