'use client'

import { PaginationProvider } from '@/components/Pagination'
import ToastContainer from '@/components/ToastContainer'
import { ThemeProvider } from '@/context/theme'
import { ITEMS_PER_PAGE } from '@/utils/constants/ui'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { SessionProvider } from 'next-auth/react'
import 'react-toastify/dist/ReactToastify.css'
import { queryClient } from '@/config/queryClient'
import ErrorBoundary from '@/components/ErrorBoundary'
import AuthErrorListener from '@/components/AuthErrorListener'
import { Session } from 'next-auth'

type ProvidersProps = {
  children: React.ReactNode
  session: Session | null
}

export default function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <ThemeProvider>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <PaginationProvider initialPage={1} initialTotal={0} initialItemsPerPage={ITEMS_PER_PAGE}>
                {children}
                <ToastContainer />
                <AuthErrorListener />
                {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
              </PaginationProvider>
            </LocalizationProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </QueryClientProvider>
    </SessionProvider>
  )
}
