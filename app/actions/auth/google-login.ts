'use server'

import { signIn } from '@/auth'
import { AuthError } from 'next-auth'

export async function googleAutenticate() {
    try {
        await signIn('google', {
            callbackUrl: '/paints'
        })
    } catch (error) {
        if (error instanceof AuthError) {
            return { error: "Google log in failed" };
        }
        throw error;
    }
}
