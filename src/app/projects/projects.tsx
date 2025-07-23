'use client'

import { useState, useEffect } from 'react'
import { SwapVertOutlined } from '@mui/icons-material'

import PSButton from '@/components/PSButton'
import PageWrapper from '@/components/PageWrapper'
import ResponsiveGrid from '@/components/ResponsiveGrid'
import Pagination, { usePagination } from '@/components/Pagination'

import ProjectCard from './components/ProjectCard'

import { useProjects } from '@/hooks/projects/useProjects'

export default function ProjectsView() {
  const [sort, setSort] = useState<'desc' | 'asc'>('desc')
  const { page, setPage, setTotalItems } = usePagination()
  const { data, isPending, error, isError } = useProjects(page, sort)
  const projects = data?.projects || []

  useEffect(() => {
    if (data) {
      setTotalItems(data.total)
    }
  }, [data, setTotalItems])

  return (
    <PageWrapper className="-mt-8">
      <div className="flex items-center justify-end flex-wrap">
        <PSButton
          label={sort === 'desc' ? 'Activity Descending' : 'Activity Ascending'}
          icon={<SwapVertOutlined className="w-4 h-4" />}
          variant="secondary"
          onClick={() => {
            setSort(sort === 'desc' ? 'asc' : 'desc')
            setPage(1)
          }}
        />
      </div>

      <ResponsiveGrid
        items={projects}
        isPending={isPending}
        isError={isError}
        error={error}
        renderItem={(project) => <ProjectCard project={project} />}
        emptyMessage="No projects found"
      />

      <Pagination />
    </PageWrapper>
  )
}
