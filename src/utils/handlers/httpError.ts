import { HttpError } from '@/utils/types/error'
import { AxiosError, isAxiosError, isCancel } from 'axios'

export function handleHttpError(context: string, error: unknown): HttpError {
  if (isCancel(error)) {
    console.warn(`[${context}] Request cancelled:`, error)
    return new HttpError(0, 'Request cancelled', null)
  }

  console.error(`[${context}]`, error)
  if (isAxiosError(error)) {
    const axiosErr = error as AxiosError
    return new HttpError(axiosErr.response?.status ?? 0, axiosErr.response?.statusText ?? 'Network Error', axiosErr.response?.data)
  }

  return new HttpError(0, 'Unknown Error', error)
}
