import { Box, Button, Typography } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
  title: string
  actionChildren?: ReactNode
}

function Direction({ title, actionChildren }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '56px',
        paddingBottom: '16px',
        borderBottom: (theme) => `1px solid ${theme.palette.grey[300]}`,
        marginBottom: '16px',
      }}
    >
      <Typography>{title}</Typography>
      {actionChildren && actionChildren}
    </Box>
  )
}

export default Direction