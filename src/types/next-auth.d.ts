import 'next-auth'

declare module 'next-auth' {
  interface Session {
    accessToken: string
    accessTokenExpiresAt: number
    refreshToken: string
    refreshTokenExpiresAt: number
    error: string

    expires: string
  }

  interface Account {
    accessToken: string
    refreshToken: string
    expires_in: number
    refresh_expires_in: number
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string
    accessTokenExpiresAt: number
    refreshToken: string
    refreshTokenExpiresAt: number
    error: string
  }
}
