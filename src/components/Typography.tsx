import React from 'react'

type TextStates =
  | 'none'
  | 'default'
  | 'disabled'
  | 'focus'
  | 'focusVisible'
  | 'hovers'
  | 'primary'
  | 'secondary'
  | 'subtitles'
  | 'tags'
  | 'tertiary'
  | 'titles'

export type TypographyProps = {
  children: React.ReactNode
  state?: TextStates
  className?: string
}

const getColorClasses = (state?: TextStates) => {
  switch (state) {
    case 'default':
      return 'text-[#6E6E6E] dark:text-[#E0E0E0]'
    case 'disabled':
      return 'text-[#DEDEDE] dark:text-[#D5D5D5]'
    case 'focus':
      return 'text-[#6E6E6E] dark:text-[#E0E0E0]'
    case 'focusVisible':
      return 'text-[#6E6E6E] dark:text-[#E0E0E0]'
    case 'hovers':
      return 'text-primary dark:text-primary-dark'
    case 'primary':
      return 'text-[#404040] dark:text-[#DEDEDE]'
    case 'secondary':
      return 'text-[#989898] dark:text-[#727272]'
    case 'subtitles':
      return 'text-[#FFFFFF] dark:text-[#FFFFFF]'
    case 'tags':
      return 'text-[#666666] dark:text-[#DEDEDE]'
    case 'tertiary':
      return 'text-[#A9A9A9] dark:text-[#F3F3F3]'
    case 'titles':
      return 'text-[#FFFFFF] dark:text-[#FFFFFF]'
    default:
      return ''
  }
}

export const H1 = ({ children, state, className }: TypographyProps) => {
  return <h1 className={`text-8xl font-light ${getColorClasses(state)} ${className}`}>{children}</h1>
}
export const H2 = ({ children, state, className }: TypographyProps) => {
  return <h2 className={`text-6xl font-light ${getColorClasses(state)} ${className}`}>{children}</h2>
}
export const H3 = ({ children, state, className }: TypographyProps) => {
  return <h3 className={`text-5xl font-normal ${getColorClasses(state)} ${className}`}>{children}</h3>
}
export const H4 = ({ children, state, className }: TypographyProps) => {
  return <h4 className={`text-4xl font-normal ${getColorClasses(state)} ${className}`}>{children}</h4>
}
export const H5 = ({ children, state, className }: TypographyProps) => {
  return <h5 className={`text-2xl font-bold ${getColorClasses(state)} ${className}`}>{children}</h5>
}
export const H6 = ({ children, state, className }: TypographyProps) => {
  return <h6 className={`text-xl font-semibold ${getColorClasses(state)} ${className}`}>{children}</h6>
}
export const Subtitle1 = ({ children, state, className }: TypographyProps) => {
  return <h6 className={`text-base font-bold ${getColorClasses(state)} ${className}`}>{children}</h6>
}
export const Subtitle2 = ({ children, state, className }: TypographyProps) => {
  return <h6 className={`text-sm font-bold ${getColorClasses(state)} ${className}`}>{children}</h6>
}
export const Body1 = ({ children, state, className }: TypographyProps) => {
  return <p className={`text-base font-normal ${getColorClasses(state)} ${className}`}>{children}</p>
}
export const Body2 = ({ children, state, className }: TypographyProps) => {
  return <p className={`text-sm font-semibold ${getColorClasses(state)} ${className}`}>{children}</p>
}
export const Body3 = ({ children, state, className }: TypographyProps) => {
  return <p className={`text-xs font-normal ${getColorClasses(state)} ${className}`}>{children}</p>
}
export const Caption = ({ children, state, className }: TypographyProps) => {
  return <p className={`text-xs font-medium ${getColorClasses(state)} ${className}`}>{children}</p>
}
export const Overline1 = ({ children, state, className }: TypographyProps) => {
  return <p className={`text-lg font-semibold uppercase ${getColorClasses(state)} ${className}`}>{children}</p>
}
export const Overline2 = ({ children, state, className }: TypographyProps) => {
  return <p className={`text-xs font-medium uppercase ${getColorClasses(state)} ${className}`}>{children}</p>
}
export const Overline3 = ({ children, state, className }: TypographyProps) => {
  return <p className={`text-[10px] font-semibold uppercase ${getColorClasses(state)} ${className}`}>{children}</p>
}
export const Overline4 = ({ children, state, className }: TypographyProps) => {
  return <p className={`text-[8px] font-semibold uppercase ${getColorClasses(state)} ${className}`}>{children}</p>
}
export const Buttons1 = ({ children, state, className }: TypographyProps) => {
  return <p className={`text-lg font-normal ${getColorClasses(state)} ${className}`}>{children}</p>
}
export const Buttons2 = ({ children, state, className }: TypographyProps) => {
  return <p className={`text-base font-semibold ${getColorClasses(state)} ${className}`}>{children}</p>
}
export const Buttons3 = ({ children, state, className }: TypographyProps) => {
  return <p className={`text-sm font-semibold ${getColorClasses(state)} ${className}`}>{children}</p>
}
export const Buttons4 = ({ children, state, className }: TypographyProps) => {
  return <p className={`text-xs font-semibold ${getColorClasses(state)} ${className}`}>{children}</p>
}
