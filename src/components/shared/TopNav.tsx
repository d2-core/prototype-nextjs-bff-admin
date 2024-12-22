import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'

function TopNav() {
  const route = useRouter()
  const handleLoginClick = () => {
    route.push('auth/login')
  }
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

      <Button onClick={handleLoginClick} variant="contained" color="primary">
        로그인
      </Button>
    </Box>
  )
}

export default TopNav
