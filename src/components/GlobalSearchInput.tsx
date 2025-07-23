'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState, useMemo, useRef } from 'react'
import { TextField, Autocomplete, InputAdornment, Skeleton, Box, Typography, Avatar } from '@mui/material'
import { Search, FolderOutlined, GroupsOutlined, PublicOutlined, LockOutlined, LanguageOutlined } from '@mui/icons-material'

import { Theme, useTheme } from '@/context/theme'
import { useDebounce } from '@/hooks/useDebounce'
import { useGlobalSearch } from '@/hooks/search/useGlobalSearch'
import { SearchGroupDto, SearchProjectDto } from '@/dtos/search/GlobalSearch.dto'

type SearchOption = (SearchGroupDto | SearchProjectDto) & {
  category: 'Groups' | 'Projects'
}

export default function GlobalSearchInput() {
  const { theme } = useTheme()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const debouncedQuery = useDebounce(query, 300)
  const inputRef = useRef<HTMLInputElement>(null)

  const { data: searchResults, isLoading } = useGlobalSearch(debouncedQuery, 'all', 8, debouncedQuery.trim().length >= 2)

  useEffect(() => setMounted(true), [])

  // Combine and format search results
  const options = useMemo(() => {
    if (!searchResults) return []

    const formattedGroups: SearchOption[] = searchResults.groups.map((group) => ({
      ...group,
      category: 'Groups' as const,
    }))

    const formattedProjects: SearchOption[] = searchResults.projects.map((project) => ({
      ...project,
      category: 'Projects' as const,
    }))

    return [...formattedGroups, ...formattedProjects]
  }, [searchResults])

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case 'public':
        return <PublicOutlined fontSize="small" className="text-alert-success-color dark:text-alert-success-color-dark" />
      case 'internal':
        return <LanguageOutlined fontSize="small" className="text-alert-warning-color dark:text-alert-warning-color-dark" />
      case 'private':
        return <LockOutlined fontSize="small" className="text-alert-error-color dark:text-alert-error-color-dark" />
      default:
        return <LockOutlined fontSize="small" className="text-text-primary dark:text-text-primary-dark" />
    }
  }

  if (!mounted) {
    return <Skeleton variant="rounded" width={320} height={40} />
  }

  return (
    <Autocomplete<SearchOption>
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      openOnFocus={false}
      disablePortal
      options={options}
      loading={isLoading}
      sx={{ width: 320 }}
      value={null}
      onChange={(_, option) => {
        if (option) {
          router.push(option.type === 'group' ? `/groups/${option.id}` : `/projects/${option.id}`)
          setQuery('')
          setOpen(false)
          inputRef.current?.blur()
        }
      }}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id && option.type === value.type}
      groupBy={(option) => option.category}
      onInputChange={(_, value) => {
        setQuery(value)
        setOpen(value.trim().length >= 2)
      }}
      filterOptions={(options) => options} // Disable client-side filtering
      slots={{
        paper: (props) => (
          <div
            {...props}
            style={{
              fontWeight: 500,
              fontSize: '14px',
              borderRadius: '8px',
              color: theme === Theme.Dark ? 'var(--text-primary-dark)' : 'var(--text-primary)',
              background: theme === Theme.Dark ? 'var(--paper-elevation-16-dark)' : 'var(--paper-elevation-16)',
              border: theme === Theme.Dark ? `1px solid var(--outlined-border-dark)` : '1px solid var(--outlined-border)',
              boxShadow: theme === Theme.Dark ? '0 10px 25px -5px rgba(0, 0, 0, 0.5)' : '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
              maxHeight: '400px',
              scrollbarWidth: 'thin',
              scrollbarColor:
                theme === Theme.Dark
                  ? 'var(--outlined-border-dark) var(--paper-elevation-16-dark)'
                  : 'var(--outlined-border) var(--paper-elevation-16)',
              ...props.style,
            }}
            className={theme === Theme.Dark ? 'dark' : ''}
          />
        ),
      }}
      renderGroup={(params) => (
        <Box key={params.key}>
          <Typography
            variant="caption"
            component="div"
            sx={{
              px: 2,
              py: 1,
              fontWeight: 600,
              color: 'var(--text-primary)',
              borderBottom: `1px solid var(--outlined-border)`,
              backgroundColor: 'var(--paper-elevation-2)',
              '.dark &': {
                color: 'var(--text-primary-dark)',
                borderBottom: `1px solid var(--outlined-border-dark)`,
                backgroundColor: 'var(--paper-elevation-2-dark)',
              },
            }}
          >
            {params.group}
          </Typography>
          {params.children}
        </Box>
      )}
      renderOption={(props, option) => (
        <Box
          {...props}
          key={props.key}
          component="li"
          sx={{
            px: 2,
            py: 1.5,
            cursor: 'pointer',
            borderBottom: theme === Theme.Dark ? '1px solid var(--divider-dark)' : '1px solid var(--divider)',
            backgroundColor: theme === Theme.Dark ? 'var(--paper-elevation-16-dark)' : 'var(--paper-elevation-16)',
            '&:hover': {
              backgroundColor: Theme.Dark ? 'var(--paper-elevation-2-dark)' : 'var(--paper-elevation-2)',
            },
            '&:last-child': {
              borderBottom: 'none',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: '100%' }}>
            {/* Avatar or Icon */}
            {option.avatarUrl ? (
              <Avatar src={option.avatarUrl} alt={option.name} sx={{ width: 32, height: 32 }} />
            ) : (
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '50%',
                  justifyContent: 'center',
                  color: theme === Theme.Dark ? 'var(--text-primary-dark)' : 'var(--text-primary)',
                  backgroundColor: theme === Theme.Dark ? 'var(--paper-elevation-cards-dark)' : 'var(--paper-elevation-cards)',
                }}
              >
                {option.type === 'group' ? <GroupsOutlined fontSize="small" /> : <FolderOutlined fontSize="small" />}
              </Box>
            )}

            {/* Content */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    color: theme === Theme.Dark ? 'var(--text-primary-dark)' : 'var(--text-primary)',
                  }}
                >
                  {option.name}
                </Typography>
                {getVisibilityIcon(option.visibility)}
              </Box>

              {option.description && (
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    color: 'var(--text-grey)',
                  }}
                >
                  {option.description}
                </Typography>
              )}

              <Typography
                variant="caption"
                sx={{
                  opacity: 0.7,
                  display: 'block',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  color: 'var(--text-grey)',
                  textOverflow: 'ellipsis',
                }}
              >
                {option.type === 'group' ? option.fullPath : option.nameWithNamespace}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          inputRef={inputRef}
          variant="standard"
          placeholder="Search projects and groups..."
          slotProps={{
            input: {
              ...params.InputProps,
              disableUnderline: true,
              sx: {
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--text-tertiary)',
                backgroundColor: 'var(--default)',
                borderRadius: '8px',
                padding: '4px 10px',
                border: `1px solid var(--outlined-border)`,
                '&::placeholder': {
                  color: 'var(--text-tertiary)',
                },
                '.dark &': {
                  color: 'var(--text-tertiary-dark)',
                  backgroundColor: 'var(--default-dark)',
                  border: `1px solid var(--outlined-border-dark)`,
                  '&::placeholder': {
                    color: 'var(--text-tertiary-dark)',
                  },
                },
              },
              startAdornment: (
                <InputAdornment position="start">
                  <Search
                    fontSize="small"
                    sx={{
                      color: 'var(--text-tertiary)',
                      '.dark &': {
                        color: 'var(--text-tertiary-dark)',
                      },
                    }}
                  />
                </InputAdornment>
              ),
              endAdornment: null,
            },
          }}
        />
      )}
      noOptionsText={query.trim().length < 2 ? 'Type at least 2 characters to search...' : 'No results found'}
    />
  )
}
