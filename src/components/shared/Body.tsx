import { Box } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

function Body({ children }: Props) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        overflowY: 'auto',
        padding: '32px 32px 240px 32px',
      }}
    >
      <Box
        sx={{
          minHeight: '912px',
          padding: '32px',
          borderRadius: '8px',
          backgroundColor: (theme) => theme.palette.grey[50],
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default Body
