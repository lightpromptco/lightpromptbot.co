import Image from 'next/image'

export default function Header() {
  return (
    <header className="flex items-center px-4 py-3 bg-white dark:bg-gray-950 shadow-soft mb-4">
      <Image
        src="/lightprompt-logo.png"
        alt="LightPrompt Logo"
        width={48}
        height={48}
        className="mr-3"
        priority
      />
      <span className="text-2xl font-bold text-primary tracking-tight">LightPrompt</span>
    </header>
  )
}