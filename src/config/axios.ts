import axios from 'axios'
import { GITLAB_API_BASE } from '@/utils/constants/endpoints'
import { getSession, signOut } from 'next-auth/react'
import { Session } from 'next-auth'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || GITLAB_API_BASE,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession()
    const teste = session as Session

    if (teste?.accessToken) {
      config.headers.Authorization = `Bearer ${teste.accessToken}`
    }

    return config
  },
  (error) => {
    console.error('Axios request error:', error)
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (error.response?.status === 403) {
      console.error('403 Forbidden - Access denied:', error.response?.data)

      if (typeof window !== 'undefined') {
        const errorEvent = new CustomEvent('authError', {
          detail: {
            status: 403,
            message: 'Access denied. Please check your permissions or login again.',
            originalError: error,
          },
        })
        window.dispatchEvent(errorEvent)
      }
    }

    if (error.response?.status === 401) {
      console.error('401 Unauthorized - Access denied:', error.response?.data)

      if (typeof window !== 'undefined') {
        const errorEvent = new CustomEvent('authError', {
          detail: {
            status: 401,
            message: 'Access denied. Please check your permissions or login again.',
            originalError: error,
          },
        })
        window.dispatchEvent(errorEvent)
      }

      await signOut()
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
