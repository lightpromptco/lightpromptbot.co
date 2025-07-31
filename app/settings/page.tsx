'use client'
import { useUser } from '@/components/AuthProvider'
import { supabase } from '@/lib/supabaseClient'

export default function Settings() {
  const { user } = useUser()
  const signInWithMagicLink = async (email: string) => {
    await supabase.auth.signInWithOtp({ email })
  }
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' })
  }
  return (
    <div className="max-w-md mx-auto py-12">
      <h2 className="text-2xl mb-4">Settings & Account</h2>
      {!user && (
        <div className="space-y-2">
          <button className="w-full bg-primary text-white rounded p-2" onClick={signInWithGoogle}>
            Sign in with Google
          </button>
          {/* Magic link UI here */}
        </div>
      )}
      {user && (
        <div>
          <p>Signed in as {user.email}</p>
          {/* Add upgrade path logic here */}
        </div>
      )}
    </div>
  )
}