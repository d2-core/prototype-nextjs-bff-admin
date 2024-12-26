import { Box, Button, Typography } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
  description: string
  children?: ReactNode
}

function ListEmpty({ description, children }: Props) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        height: '160px',
        textAlign: 'center',
        border: (theme) => `1px solid ${theme.palette.grey[300]}`,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" color="textSecondary" sx={{ marginBottom: 2 }}>
        {description}
      </Typography>
      {children != null && children}
    </Box>
  )
}

export default ListEmpty
