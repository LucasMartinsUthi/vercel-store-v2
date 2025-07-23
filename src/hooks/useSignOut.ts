import { signOut } from 'next-auth/react'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

export const useSignOut = () => {
  const queryClient = useQueryClient()

  const handleSignOut = useCallback(async () => {
    queryClient.clear()
    await signOut()
  }, [queryClient])

  return handleSignOut
}
