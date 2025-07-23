import React, { useMemo, useState } from 'react'
import { useTheme, Theme } from '@/context/theme'

import {
  Paper,
  Table,
  SxProps,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableProps,
  TableContainer,
  TableCellProps,
  Theme as MuiTheme,
  TablePagination,
} from '@mui/material'
import { mergeSx } from '@/utils/functions/styles'

export type GenericTableColumn<T> = {
  label: string
  dataIndex: keyof T
  cellProps?: TableCellProps
  headerCellSx?: SxProps<MuiTheme>
  render?: (value: any, record: T) => React.ReactNode
  headerRender?: (data: any) => React.ReactNode
}

export type GenericTableProps<T> = {
  rows: T[]
  tableProps?: TableProps
  defaultPageSize?: number
  rowSx?: SxProps<MuiTheme>
  disablePagination?: boolean
  headerRowSx?: SxProps<MuiTheme>
  containerSx?: SxProps<MuiTheme>
  columns: GenericTableColumn<T>[]
}

function GenericTable<T extends object>({
  rows,
  rowSx,
  columns,
  tableProps,
  containerSx,
  headerRowSx,
  defaultPageSize = 5,
  disablePagination = false,
}: GenericTableProps<T>) {
  const { theme } = useTheme()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const visibleRows = useMemo(() => [...rows].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [page, rowsPerPage])

  const defaultContainerSx: SxProps<MuiTheme> =
    theme === Theme.Dark
      ? {
          backgroundColor: 'var(--paper-elevation-cards-dark)',
          color: 'var(--text-primary-dark)',
          boxShadow: 'none',
        }
      : {}

  const defaultTableSx: SxProps<MuiTheme> =
    theme === Theme.Dark
      ? {
          backgroundColor: 'var(--paper-elevation-cards-dark)',
          color: 'var(--text-primary-dark)',
          '& th, & td': { color: 'var(--text-primary-dark)', borderColor: 'var(--divider-dark)' },
          '& tbody tr': {
            '&:hover': { backgroundColor: 'var(--paper-elevation-2-dark)' },
          },
        }
      : {}

  const defaultHeaderRowSx: SxProps<MuiTheme> =
    theme === Theme.Dark
      ? {
          backgroundColor: 'var(--paper-elevation-cards-dark)',
          color: 'var(--text-primary-dark)',
          borderBottom: 'var(--divider-dark)',
        }
      : {}

  const defaultTableRowSx: SxProps<MuiTheme> =
    theme === Theme.Dark
      ? {
          backgroundColor: 'var(--paper-elevation-cards-dark)',
          '&:hover': { backgroundColor: 'var(--paper-elevation-2-dark)' },
        }
      : {}

  const defaultTableCellSx: SxProps<MuiTheme> =
    theme === Theme.Dark
      ? {
          color: 'var(--text-primary-dark)',
          borderColor: 'var(--divider-dark)',
        }
      : {}

  return (
    <>
      <TableContainer component={Paper} sx={mergeSx(defaultContainerSx, containerSx)}>
        <Table sx={mergeSx(defaultTableSx, tableProps?.sx)} {...tableProps}>
          <TableHead>
            <TableRow sx={mergeSx(defaultHeaderRowSx, headerRowSx)}>
              {columns.map(({ label, dataIndex, cellProps, headerCellSx, headerRender }, idx) => (
                <TableCell
                  key={`${String(dataIndex)}-header=${idx}`}
                  sx={mergeSx(defaultTableCellSx, headerCellSx, cellProps?.sx)}
                  {...cellProps}
                >
                  {headerRender ? headerRender(label) : label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row, rowIndex) => (
              <TableRow key={`row-${rowIndex}`} sx={mergeSx(defaultTableRowSx, rowSx)}>
                {columns.map(({ dataIndex, cellProps, render }, idx) => (
                  <TableCell
                    sx={mergeSx(defaultTableCellSx, cellProps?.sx)}
                    key={`${String(dataIndex)}-cell-${rowIndex}-${idx}`}
                    {...cellProps}
                  >
                    {render ? render(row[dataIndex], row) : String(row[dataIndex])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {disablePagination ? null : (
        <TablePagination
          page={page}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            color: theme === Theme.Dark ? 'var(--text-primary-dark)' : 'var(--text-primary)',
            '& .MuiSvgIcon-root': { color: theme === Theme.Dark ? 'var(--text-primary-dark)' : 'var(--text-primary)' },
          }}
        />
      )}
    </>
  )
}

export default GenericTable
