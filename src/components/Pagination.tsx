import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react'
import Pagination from '@mui/material/Pagination'
import { Theme, useTheme } from '@/context/theme'
import { ITEMS_PER_PAGE } from '@/utils/constants/ui'

type PaginationContextType = {
  page: number
  totalItems: number
  itemsPerPage: number
  setPage: (page: number) => void
  setTotalItems: (total: number) => void
  setItemsPerPage: (count: number) => void
  totalPages: number
  resetPagination: () => void
}

const PaginationContext = createContext<PaginationContextType | undefined>(undefined)

type PaginationProviderProps = {
  children: ReactNode
  initialPage?: number
  initialTotal?: number
  initialItemsPerPage?: number
}

export const PaginationProvider = ({
  children,
  initialPage = 1,
  initialTotal = 0,
  initialItemsPerPage = ITEMS_PER_PAGE,
}: PaginationProviderProps) => {
  const [page, setPage] = useState(initialPage)
  const [totalItems, setTotalItems] = useState(initialTotal)
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage)

  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / itemsPerPage)
  }, [totalItems, itemsPerPage])

  const resetPagination = () => {
    setPage(1)
    setTotalItems(0)
  }

  return (
    <PaginationContext.Provider
      value={{
        page,
        totalItems,
        itemsPerPage,
        setPage,
        setTotalItems,
        setItemsPerPage,
        totalPages,
        resetPagination,
      }}
    >
      {children}
    </PaginationContext.Provider>
  )
}

export const usePagination = (reset?: boolean) => {
  const context = useContext(PaginationContext)
  if (context === undefined) {
    throw new Error('usePagination must be used within a PaginationProvider')
  }

  if (reset) {
    context.resetPagination()
  }

  return context
}

const CustomPagination = () => {
  const { theme } = useTheme()
  const { page, setPage, totalPages } = usePagination()

  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center mt-8">
      <Pagination
        page={page}
        count={totalPages}
        onChange={(_, value) => {
          setPage(value)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
        color="primary"
        shape="circular"
        sx={{
          '& .MuiPaginationItem-root': {
            color: theme === Theme.Light ? '#6E6E6E' : '#E0E0E0',
          },
          '& .Mui-selected': {
            color: '#E0E0E0',
          },
        }}
        showFirstButton
        showLastButton
      />
    </div>
  )
}

export default CustomPagination
