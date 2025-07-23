'use client'

import { useSession, signIn } from 'next-auth/react'
import { ReactNode, useEffect } from 'react'
import { Box, Container, CircularProgress } from '@mui/material'
import { LoginOutlined } from '@mui/icons-material'
import { useSignOut } from '@/hooks/useSignOut'
import { H5, Body1 } from './Typography'
import PSButton from './PSButton'
import { Card } from './Card'

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const signOutClearCache = useSignOut()

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signIn(undefined, { callbackUrl: '/' })
    }

    if (session?.error === 'RefreshAccessTokenExpired') {
      signOutClearCache()
    }
  }, [session])

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" className="bg-gray-50 dark:bg-gray-900">
        <CircularProgress size={48} />
      </Box>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <Box className="relative h-full" display="flex" alignItems="center" justifyContent="center">
        {/* Blurred background content */}
        <div className="absolute inset-0 blur-sm pointer-events-none select-none opacity-30">{children}</div>

        {/* Auth modal */}
        <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 10 }}>
          <Card.Root className="max-w-md mx-auto">
            <Card.Header>
              <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                <Box className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <LoginOutlined
                    sx={{
                      fontSize: 32,
                      color: 'white',
                    }}
                  />
                </Box>
              </Box>
              <H5 state="subtitles" className="text-center">
                Authentication Required
              </H5>
            </Card.Header>

            <Box className="p-6 space-y-4">
              <Body1 state="secondary" className="text-center">
                You need to be signed in to access this content. Please authenticate to continue.
              </Body1>

              <Box className="flex justify-center pt-4">
                <PSButton
                  label="Sign In"
                  variant="secondary"
                  icon={<LoginOutlined className="w-4 h-4" />}
                  onClick={() => signIn(undefined, { callbackUrl: '/' })}
                />
              </Box>
            </Box>
          </Card.Root>
        </Container>
      </Box>
    )
  }

  return <>{children}</>
}
