import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'

function TopNav() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        padding: '12px 24px',
        borderBottom: (theme) => `1px solid ${theme.palette.grey[300]}`,
        bgcolor: 'background.paper',
        zIndex: 1000,
      }}
    >
      <Link href="/">
        <Typography
          variant="h6"
          sx={{
            color: 'inherit',
            cursor: 'pointer',
            '&:hover': {
              color: (theme) => theme.palette.primary.main,
            },
          }}
        >
          Creation
        </Typography>
      </Link>

      <Button variant="contained" color="primary">
        로그인
      </Button>
    </Box>
  )
}

export default TopNav
