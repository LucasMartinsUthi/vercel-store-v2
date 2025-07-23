import './globals.css'
import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import TopBar from '@/components/TopBar'
import Providers from './providers'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import AuthGuard from '@/components/AuthGuard'
import { Session } from 'next-auth'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Project Analytics',
  description: 'The ultimate Project Analytics platform for discovering and exploring projects',
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session: Session | null = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={`${manrope.className} antialiased h-screen overflow-hidden`}>
        <Providers session={session}>
          <div className="h-full flex flex-col">
            <TopBar />
            <div className="flex flex-1 min-h-0">
              <Sidebar />
              <main className="p-6 flex-1 bg-gray-50 dark:bg-neutral-950 overflow-auto">
                <AuthGuard>{children}</AuthGuard>
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
