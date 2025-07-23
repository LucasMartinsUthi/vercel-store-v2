'use client'

import { ReactNode } from 'react'
import { Overline4 } from './Typography'

type Props = {
  label: string
  value: string | number
  icon: ReactNode
}

const Tags = ({ label, value, icon }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <Overline4 state="tags">{label}</Overline4>
      <div className="flex items-center gap-1 px-2 py-1 rounded bg-neutral-200 dark:bg-neutral-700 text-[#666666] dark:text-white text-xs font-semibold w-fit">
        {icon}
        {value}
      </div>
    </div>
  )
}

export default Tags
