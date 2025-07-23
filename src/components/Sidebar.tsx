'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { ArrowBackOutlined } from '@mui/icons-material'

import { Buttons3 } from './Typography'
import { menuSections, SidebarItem as SidebarItemType } from '@/utils/constants/menuItems'

export type SidebarItemProps = SidebarItemType & {
  isOpen: boolean
}

const SidebarItem = ({ id, label, icon, isOpen, isHome }: SidebarItemProps) => {
  const pathname = usePathname()
  const active = pathname.includes(id) || (isHome && pathname === '/')

  return (
    <Link href={isHome ? '/' : `/${id}`}>
      <div
        className={`flex items-center gap-3 px-3 py-2 my-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer ${active ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : ''}`}
      >
        <span className="text-xl">{icon}</span>
        {isOpen && <Buttons3 className="mt-1">{label}</Buttons3>}
      </div>
    </Link>
  )
}

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <aside
      className={`
        h-full bg-white text-neutral-800 border-r border-neutral-200 transition-[width] duration-300
        dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-800 
        ${isOpen ? 'w-64' : 'w-16'}
    `}
    >
      {/* Top button */}
      <div className={`flex p-2 ${isOpen ? 'justify-end' : 'justify-center'}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-transform duration-300 rounded-full cursor-pointer ${!isOpen && `rotate-180`}`}
        >
          <ArrowBackOutlined />
        </button>
      </div>

      {/* Menu content */}
      <nav className={`${isOpen ? 'px-4' : 'px-2'} flex flex-col transition-[padding] duration-300`}>
        {menuSections.map((section, index) => (
          <div key={index}>
            {index > 0 && <hr className="my-3 border-t border-neutral-200 dark:border-neutral-800" />}

            <div
              className={`text-xs text-neutral-500 px-3 my-1 pointer-events-none ${isOpen ? 'opacity-100 max-h-6' : 'opacity-0 max-h-0'} transition-[max-height,opacity] duration-300`}
            >
              {section.label}
            </div>

            <div>
              {section.items.map((item) => (
                <SidebarItem {...item} isOpen={isOpen} key={item.id} />
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
