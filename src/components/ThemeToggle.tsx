'use client'

import { LightModeOutlined, DarkModeOutlined } from '@mui/icons-material'
import { Skeleton } from '@mui/material'
import { useTheme } from '@/context/theme'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex items-center gap-2">
      <LightModeOutlined className="w-4 h-4 text-black/40 dark:text-white/90" />

      <button
        onClick={toggleTheme}
        className="w-10 h-5 rounded-full bg-black/10 dark:bg-white/50 relative transition-colors cursor-pointer"
      >
        {!!theme ? (
          <div
            className={`w-4 h-4 absolute top-0.5 left-0.5 rounded-full shadow-md transform transition-transform duration-300 ${
              theme === 'dark' ? 'translate-x-5 bg-white' : 'translate-x-0 bg-black/40'
            }`}
          />
        ) : (
          <Skeleton variant="rounded" width={40} height={20} />
        )}
      </button>

      <DarkModeOutlined className="w-4 h-4 text-black/40 dark:text-white/90" />
    </div>
  )
}

export default ThemeToggle
