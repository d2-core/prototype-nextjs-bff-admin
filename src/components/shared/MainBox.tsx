import { Box } from '@mui/material'
import { ReactNode } from 'react'
import TopNav from './TopNav'
import SideNav from './SideNav'
import Body from './Body'

interface Props {
  children: ReactNode
}
function MainBox({ children }: Props) {
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
        <SideNav />
        <Body children={children} />
      </Box>
    </Box>
  )
}

export default MainBox
