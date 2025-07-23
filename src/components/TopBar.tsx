'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Avatar, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import { LogoutOutlined } from '@mui/icons-material'
import { useState } from 'react'

import { H5 } from './Typography'
import ThemeToggle from './ThemeToggle'
import GlobalSearchInput from './GlobalSearchInput'
import { useSignOut } from '@/hooks/useSignOut'
import { Theme, useTheme } from '@/context/theme'

const TopBar = () => {
  const { data: session } = useSession()
  const { theme } = useTheme()
  const handleSignOut = useSignOut()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenuSignOut = () => {
    handleClose()
    handleSignOut()
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-neutral-900 shadow-sm border-b border-neutral-200 dark:border-neutral-800 relative z-10 flex-shrink-0">
      <Link href="/" className="cursor-pointer">
        <H5 state="primary">Project Analytics</H5>
      </Link>
      <div className="flex items-center gap-4">
        <GlobalSearchInput />
        <ThemeToggle />
        {session?.user && (
          <>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 1 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }} src={session.user.image || undefined} alt={session.user.name || 'User'}>
                  {session.user.name?.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  borderRadius: '8px',
                  color: theme === Theme.Dark ? 'var(--text-primary-dark)' : 'var(--text-primary)',
                  background: theme === Theme.Dark ? 'var(--paper-elevation-16-dark)' : 'var(--paper-elevation-16)',
                  border: theme === Theme.Dark ? '1px solid var(--outlined-border-dark)' : '1px solid var(--outlined-border)',
                  boxShadow: theme === Theme.Dark ? '0 10px 25px -5px rgba(0, 0, 0, 0.5)' : '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                  '& .MuiMenuItem-root': {
                    color: theme === Theme.Dark ? 'var(--text-primary-dark)' : 'var(--text-primary)',
                    '&:hover': {
                      backgroundColor: theme === Theme.Dark ? 'var(--paper-elevation-2-dark)' : 'var(--paper-elevation-2)',
                    },
                  },
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: theme === Theme.Dark ? 'var(--paper-elevation-16-dark)' : 'var(--paper-elevation-16)',
                    border: theme === Theme.Dark ? '1px solid var(--outlined-border-dark)' : '1px solid var(--outlined-border)',
                    borderBottom: 'none',
                    borderRight: 'none',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleMenuSignOut}>
                <LogoutOutlined sx={{ mr: 1 }} />
                Sign out
              </MenuItem>
            </Menu>
          </>
        )}
      </div>
    </header>
  )
}

export default TopBar
