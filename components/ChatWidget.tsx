import React, { useState } from 'react';

export default function ChatWidget() {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessages([...messages, { role: 'user', content: input }]);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setMessages([...messages, { role: 'user', content: input }, { role: 'assistant', content: data.response }]);
    setInput('');
    setLoading(false);
  }

  return (
    <div className="chat-widget">
      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={m.role}>{m.content}</div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type your message..." />
        <button type="submit" disabled={loading}>Send</button>
      </form>
    </div>
  );
}