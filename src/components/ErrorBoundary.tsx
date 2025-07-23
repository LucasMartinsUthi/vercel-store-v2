'use client'

import React from 'react'
import { Box, Container } from '@mui/material'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import { ErrorOutline, LockOutlined, RefreshOutlined } from '@mui/icons-material'

import { Card } from './Card'
import PSButton from './PSButton'
import { H5, Body1, Body2 } from './Typography'

import { HttpError } from '@/utils/types/error'

interface ErrorFallbackProps {
  error: Error | HttpError
  resetErrorBoundary: () => void
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  const isHttpError = error instanceof HttpError
  const status = isHttpError ? error.status : null
  const isAuthError = status === 401 || status === 403

  const getErrorIcon = () => {
    if (isAuthError) {
      return <LockOutlined sx={{ fontSize: 32, color: 'white' }} />
    }
    return <ErrorOutline sx={{ fontSize: 32, color: 'white' }} />
  }

  const getErrorTitle = () => {
    if (isAuthError) return 'Access Denied'
    if (status === 404) return 'Page Not Found'
    if (status === 500) return 'Server Error'
    return 'Something went wrong'
  }

  const getErrorMessage = () => {
    if (isAuthError) return "You don't have permission to access this resource."
    if (status === 404) return 'The page you are looking for could not be found.'
    if (status === 500) return 'The server encountered an error. Please try again later.'
    return 'An unexpected error occurred. Please try again.'
  }

  return (
    <Box className="h-full" display="flex" alignItems="center" justifyContent="center">
      <Container maxWidth="sm">
        <Card.Root className="max-w-md mx-auto">
          <Card.Header>
            <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
              <Box className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">{getErrorIcon()}</Box>
            </Box>
            <H5 state="subtitles" className="text-center">
              {getErrorTitle()}
            </H5>
          </Card.Header>

          <Box className="p-6 space-y-4">
            <Body1 state="secondary" className="text-center">
              {getErrorMessage()}
            </Body1>

            {isHttpError && (
              <Box className="text-center">
                <Body2 state="tertiary" className="text-sm">
                  Error Code: {status}
                </Body2>
              </Box>
            )}

            {!isAuthError && (
              <Box className="flex justify-center pt-2">
                <PSButton
                  label="Try Again"
                  variant="secondary"
                  icon={<RefreshOutlined className="w-4 h-4" />}
                  onClick={resetErrorBoundary}
                />
              </Box>
            )}
          </Box>
        </Card.Root>
      </Container>
    </Box>
  )
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<ErrorFallbackProps>
}

export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      FallbackComponent={fallback || ErrorFallback}
      onError={(error, errorInfo) => {
        console.error('Error boundary caught an error:', error, errorInfo)
      }}
    >
      {children}
    </ReactErrorBoundary>
  )
}

export default ErrorBoundary
