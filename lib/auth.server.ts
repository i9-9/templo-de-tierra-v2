import { prisma } from './prisma'
import { createClient } from '@supabase/supabase-js'

// Create a Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

export async function signUpWithEmail(email: string, password: string) {
  try {
    // 1. Create the user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXTAUTH_URL}/auth/callback`
      }
    })

    if (authError) throw authError

    if (!authData.user) {
      throw new Error('No user data returned from Supabase')
    }

    // 2. Create the user profile in the User table
    const { error: profileError } = await supabase
      .from('User')
      .insert([
        {
          id: authData.user.id,
          email: authData.user.email,
          name: email.split('@')[0],
          isAdmin: false,
        }
      ])
    
    if (profileError) {
      console.error('Error creating user profile:', profileError)
      // Attempt to clean up the auth user if profile creation fails
      await supabase.auth.admin.deleteUser(authData.user.id)
      throw profileError
    }

    return authData
  } catch (error) {
    console.error('Error in signUpWithEmail:', error)
    throw error
  }
} 