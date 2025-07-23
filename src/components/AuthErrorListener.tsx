'use client'

import { useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { toast } from 'react-toastify'

export function AuthErrorListener() {
  useEffect(() => {
    const handleAuthError = (event: CustomEvent) => {
      const { status, message } = event.detail

      if (status === 403) {
        toast.error(message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
        })

        // Optional: Auto sign out after 5 seconds for 403 errors
        setTimeout(() => {
          signOut({ callbackUrl: '/login' })
        }, 5000)
      }
    }

    window.addEventListener('authError', handleAuthError as EventListener)

    return () => {
      window.removeEventListener('authError', handleAuthError as EventListener)
    }
  }, [])

  return null
}

export default AuthErrorListener
