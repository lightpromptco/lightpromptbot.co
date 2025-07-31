import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'
import AuthProvider from '@/components/AuthProvider'
import Header from '@/components/Header'

export const metadata = {
  title: 'LightPrompt',
  description: 'Soul-tech wellness AI platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans bg-background text-gray-900 transition-colors min-h-screen">
        <ThemeProvider>
          <AuthProvider>
            <Header />
            <main className="max-w-3xl mx-auto">{children}</main>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}