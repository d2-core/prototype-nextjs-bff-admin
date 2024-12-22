import { Box } from '@mui/material'
import { ReactElement, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}
function Body({ children }: Props) {
  if (children == null) {
    return null
  }
  return (
    <Box
      sx={{
        width: '100%',
        background: 'aqua',
        height: '100vh',
        overflowY: 'auto',
        padding: '16px 16px 240px 16px',
      }}
    >
      {children}
    </Box>
  )
}

export default Body
