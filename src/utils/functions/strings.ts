export const capitalize = (str: string): string => (str ? str.charAt(0).toUpperCase() + str.slice(1) : '')

export function stringAvatar(name: string): { children: string } {
  const words = name.trim().split(/\s+/)
  const initials = words.length === 1 ? words[0][0] : words[0][0] + (words[1]?.[0] || '')
  return {
    children: initials.toUpperCase(),
  }
}

export const formatRepositorySize = (bytes: number) => {
  if (bytes === 0) return '0 B'

  const mb = bytes / (1024 * 1024)
  const kb = bytes / 1024

  if (mb >= 1) {
    return `${mb.toFixed(1)} MB`
  } else if (kb >= 1) {
    return `${kb.toFixed(1)} KB`
  } else {
    return `${bytes} B`
  }
}
