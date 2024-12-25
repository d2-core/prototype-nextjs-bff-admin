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
          maxWidth: '1200px',
          minHeight: '912px',
          padding: '32px',
          margin: '0 auto',
          borderRadius: '8px',
          backgroundColor: 'white',
          border: (theme) => `1px solid ${theme.palette.grey[300]}`,
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default Body
