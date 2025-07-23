'use client'

import Link from 'next/link'
import { PeopleAltOutlined, FolderOutlined, TrendingUpOutlined, PublicOutlined, AccessTime, ChevronRight } from '@mui/icons-material'

import Tags from '@/components/Tags'
import { Card } from '@/components/Card'
import { H5 } from '@/components/Typography'

import { ListGroupsDto } from '@/dtos/groups/ListGroups.dto'
import { formatLastActivity } from '@/utils/functions/dates'
import { Avatar, Tooltip } from '@mui/material'
import { stringAvatar } from '@/utils/functions/strings'

type Props = {
  group: ListGroupsDto
}

const GroupCard = ({ group }: Props) => {
  return (
    <Card.Root>
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4">
        <Tooltip title={group.name} placement="top" arrow>
          <div className="flex items-center gap-4 w-4/5">
            <Avatar alt={group.name} {...stringAvatar(group.name)} sx={{ width: 40, height: 40 }} />
            <H5 state="primary" className="text-nowrap overflow-hidden text-ellipsis">
              {group.name}
            </H5>
          </div>
        </Tooltip>
        <Link href={`/groups/${group.id}`}>
          <ChevronRight className="text-primary dark:text-primary-dark cursor-pointer hover:opacity-60" />
        </Link>
      </div>

      <Card.Metadata>
        <Tags label="Projects" value={group.projectsCount} icon={<FolderOutlined fontSize="small" />} />
        <Tags label="Active" value={group.activeProjectsCount} icon={<TrendingUpOutlined fontSize="small" />} />
        <Tags label="Public" value={group.publicProjectsCount} icon={<PublicOutlined fontSize="small" />} />
        <Tags label="Members" value={group.membersCount} icon={<PeopleAltOutlined fontSize="small" />} />
        <Tags label="Last Activity" value={formatLastActivity(group.lastActivity)} icon={<AccessTime fontSize="small" />} />
      </Card.Metadata>
    </Card.Root>
  )
}

export default GroupCard
