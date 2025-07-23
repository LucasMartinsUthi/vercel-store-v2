import axios from '@/config/axios'
import { isAxiosError } from 'axios'
import moment from 'moment'
import { NextAuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import KeycloakProvider from 'next-auth/providers/keycloak'

const TOKEN_REFRESH_MARGIN = 10 // seconds

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    if (moment().unix() > token.refreshTokenExpiresAt) throw Error('Refresh token expired')

    const payload = new URLSearchParams({
      client_id: process.env.KEYCLOAK_CLIENT_ID!,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken,
    })

    const response = await axios.post('/protocol/openid-connect/token', payload.toString(), {
      baseURL: process.env.KEYCLOAK_ISSUER!,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    const refreshedTokens = response.data

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpiresAt: moment()
        .add(refreshedTokens.expires_in - TOKEN_REFRESH_MARGIN, 's')
        .unix(),
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
      refreshTokenExpiresAt: moment()
        .add(refreshedTokens.refresh_expires_in - TOKEN_REFRESH_MARGIN, 'seconds')
        .unix(),
    }
  } catch (error) {
    console.error(error)

    return {
      ...token,
      error: isAxiosError(error) ? 'RefreshAccessTokenError' : 'RefreshAccessTokenExpired',
    }
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER!,
      httpOptions: {
        timeout: 20000, // 20 seconds timeout
      },
      checks: ['pkce', 'state'],
    }),
  ],
  secret: process.env.AUTH_SECRET,
  debug: true, // Force debug in production to see the issue
  ...(process.env.NODE_ENV === 'development' && {
    events: {
      async signIn(message) {
        console.log('SignIn Event:', message)
      },
      async signOut(message) {
        console.log('SignOut Event:', message)
      },
      async createUser(message) {
        console.log('CreateUser Event:', message)
      },
      async updateUser(message) {
        console.log('UpdateUser Event:', message)
      },
      async linkAccount(message) {
        console.log('LinkAccount Event:', message)
      },
      async session(message) {
        console.log('Session Event:', message)
      },
    },
  }),
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token || token.accessToken
        token.accessTokenExpiresAt =
          moment()
            .add(account.expires_in - TOKEN_REFRESH_MARGIN, 's')
            .unix() || token.accessTokenExpiresAt
        token.refreshToken = account.refresh_token || token.refreshToken
        token.refreshTokenExpiresAt =
          moment()
            .add(account.refresh_expires_in - TOKEN_REFRESH_MARGIN, 's')
            .unix() || token.refreshTokenExpiresAt

        return token
      }

      if (moment().unix() < token.accessTokenExpiresAt) {
        return token
      }

      return refreshAccessToken(token)
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken
        session.error = token.error
      }

      return session
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/login')) {
        return baseUrl
      }

      if (url.startsWith('/')) {
        return `${baseUrl}${url}`
      }

      if (new URL(url).origin === baseUrl) {
        return url
      }

      return baseUrl
    },
  },
}
