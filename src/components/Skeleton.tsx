import { Theme, useTheme } from '@/context/theme'
import { Skeleton as MuiSkeleton, SkeletonOwnProps } from '@mui/material'

export default function Skeleton({ width = '100%', height = 200, variant = 'rectangular' }: SkeletonOwnProps) {
  const { theme } = useTheme()

  return (
    <MuiSkeleton
      width={width}
      variant={variant}
      height={height}
      className="rounded-lg"
      sx={theme == Theme.Dark ? { bgcolor: 'grey.900' } : {}}
    />
  )
}
