import { SxProps, Theme } from '@mui/material'

export function mergeSx(...styles: (SxProps<Theme> | undefined)[]): SxProps<Theme> | undefined {
  const filtered = styles.filter(Boolean)
  if (filtered.length === 0) return undefined
  if (filtered.length === 1) return filtered[0]
  return (theme) =>
    filtered.reduce<Record<string, any>>((acc, sx) => {
      const style = typeof sx === 'function' ? sx(theme) : sx
      return { ...acc, ...style }
    }, {})
}
