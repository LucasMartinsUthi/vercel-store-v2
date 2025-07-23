'use client'

import Link from 'next/link'
import { SdStorageOutlined, AccessTime, TimelineOutlined, AccountTreeOutlined, InsertChartOutlinedRounded } from '@mui/icons-material'

import Tags from '@/components/Tags'
import { Card } from '@/components/Card'
import PSButton from '@/components/PSButton'
import { H6, Overline2 } from '@/components/Typography'

import { formatLastActivity } from '@/utils/functions/dates'
import { formatRepositorySize } from '@/utils/functions/strings'
import { ListProjectsDto } from '@/dtos/projects/ListProjects.dto'

const ProjectCard = ({ project }: { project: ListProjectsDto }) => {
  return (
    <Card.Root>
      <Card.Header>
        <H6 state="titles">{project.name}</H6>
        <Overline2 state="subtitles">{project.namespace.name}</Overline2>
      </Card.Header>

      <Card.Metadata>
        <Tags label="Commits" value={`${project.totalCommits}`} icon={<TimelineOutlined className="w-4 h-4" />} />
        <Tags label="Branches" value={`${project.totalBranches}`} icon={<AccountTreeOutlined className="w-4 h-4" />} />
        <Tags label="Last Updated" icon={<AccessTime className="w-4 h-4" />} value={formatLastActivity(project.lastCommitDate)} />
        <Tags label="Size" value={formatRepositorySize(project.repositorySizeBytes)} icon={<SdStorageOutlined className="w-4 h-4" />} />
      </Card.Metadata>

      <Card.ActionButtons>
        <Link href={`/projects/${project.id}`}>
          <PSButton label="More details" variant="secondary" icon={<InsertChartOutlinedRounded />} />
        </Link>
      </Card.ActionButtons>
    </Card.Root>
  )
}

export default ProjectCard
