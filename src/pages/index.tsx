import Body from '@/components/shared/Body'
import SideNav from '@/components/shared/SideNav'
import TopNav from '@/components/shared/TopNav'
import { Box } from '@mui/material'
import { ReactNode, useState } from 'react'

export default function Home() {
  const [children, setChildren] = useState<ReactNode | null>(null)

  const handleChangeView = (children: ReactNode) => {
    setChildren(children)
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
        overflowY: 'hidden',
      }}
    >
      <TopNav />
      <Box sx={{ display: 'flex' }}>
        <SideNav onChangeChildren={handleChangeView} />
        <Body children={children} />
      </Box>
    </Box>
  )
}
