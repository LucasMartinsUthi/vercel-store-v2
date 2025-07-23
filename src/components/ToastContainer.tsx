import React from 'react'
import { useTheme, Theme } from '@/context/theme'
import { ToastContainer as ToastifyContainer } from 'react-toastify'

const ToastContainer: React.FC = () => {
  const { theme } = useTheme()

  return (
    <ToastifyContainer
      draggable
      newestOnTop
      closeOnClick
      autoClose={4000}
      position="top-right"
      pauseOnFocusLoss={false}
      theme={theme === Theme.Dark ? 'dark' : 'light'}
    />
  )
}

export default ToastContainer
