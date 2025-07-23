'use client'

import React from 'react'
import { OpenInNewOutlined } from '@mui/icons-material'

import { formatLastActivity } from '@/utils/functions/dates'
import { Body1, H3, H6, Overline1 } from '@/components/Typography'
import { GetProjectDto } from '@/dtos/projects/GetProject.dto'

type ProjectHeaderProps = Pick<GetProjectDto, 'name' | 'description' | 'namespace' | 'lastActivityAt' | 'webUrl'>

const ProjectHeader = ({ name, description, namespace, lastActivityAt, webUrl }: ProjectHeaderProps) => {
  // TODO: Replace hardcoded styles with Tailwind CSS variables
  return (
    <div
      className="space-y-2 flex flex-col justify-end rounded-lg p-8 text-white mb-6 min-h-64 bg-[rgba(97,156,228,0.1)] dark:bg-[rgba(97,156,228,0.12)]"
      style={{
        backgroundSize: '40px 40px',
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="flex items-center gap-3">
        <H3 state="hovers">{name}</H3>
        <a
          href={webUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
          title="Open in GitLab"
        >
          <OpenInNewOutlined fontSize="small" />
        </a>
      </div>
      <H6 state="primary">{description}</H6>
      <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
        <Overline1 state="focus">{namespace ? `@${namespace.name}` : 'N/A'}</Overline1>
        <Body1 state="focus">{`Last Activity: ${formatLastActivity(lastActivityAt)}`}</Body1>
      </div>
    </div>
  )
}

export default ProjectHeader
