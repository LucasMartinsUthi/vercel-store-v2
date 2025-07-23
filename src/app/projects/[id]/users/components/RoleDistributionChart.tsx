import { FC, useMemo } from 'react'
import { PieChart } from '@mui/x-charts'
import { SignalCellularNodata } from '@mui/icons-material'

import { Theme, useTheme } from '@/context/theme'
import { Body1 } from '@/components/Typography'
import { UserRolesDto } from '@/dtos/users/GetProjectUsers.dto'

interface RoleDistributionChartProps {
  userRoles: UserRolesDto
}

const RoleDistributionChart: FC<RoleDistributionChartProps> = ({ userRoles }) => {
  const { theme } = useTheme()

  const rolesChartData = useMemo(() => {
    if (!userRoles) return []

    const roleColors = {
      Administrator: 'var(--info-main)',
      Owner: 'var(--info-main-dark)',
      Maintainer: 'var(--info-light)',
      Developer: 'var(--info-light-dark)',
      Reporter: 'var(--primary)',
    }

    return [
      {
        label: 'Administrators',
        value: userRoles.administratorCount,
        color: roleColors.Administrator,
      },
      {
        label: 'Owners',
        value: userRoles.ownerCount,
        color: roleColors.Owner,
      },
      {
        label: 'Maintainers',
        value: userRoles.maintainerCount,
        color: roleColors.Maintainer,
      },
      {
        label: 'Developers',
        value: userRoles.developerCount,
        color: roleColors.Developer,
      },
      {
        label: 'Reporters',
        value: userRoles.reporterCount,
        color: roleColors.Reporter,
      },
    ].filter((item) => item.value > 0)
  }, [userRoles])

  return rolesChartData.length > 0 ? (
    <div className="flex flex-col items-center">
      <PieChart
        sx={{
          '& .MuiChartsLabel-root': {
            color: theme === Theme.Dark ? 'var(--text-primary-dark)' : 'var(--text-primary)',
          },
        }}
        series={[
          {
            outerRadius: 80,
            data: rolesChartData,
            arcLabel: (item) => `${item.value}`,
            arcLabelMinAngle: 35,
          },
        ]}
        width={220}
        height={220}
        slotProps={{
          legend: {
            position: { vertical: 'middle', horizontal: 'start' },
          },
        }}
      />
    </div>
  ) : (
    <div className="w-full h-64 flex flex-col items-center justify-center gap-3">
      <SignalCellularNodata className="!text-4xl text-text-primary fill-text-primary dark:text-text-primary-dark dark:fill-text-primary-dark" />
      <Body1 state="primary">No roles data found</Body1>
    </div>
  )
}

export default RoleDistributionChart
