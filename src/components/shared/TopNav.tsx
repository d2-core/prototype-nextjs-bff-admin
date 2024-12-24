import useUser from '@/hooks/auth/useUser'
import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { use, useCallback } from 'react'

function TopNav() {
  const route = useRouter()
  const { user } = useUser()
  const handleWorkspaceRoute = useCallback(() => {
    route.push('/workspace')
  }, [route])

  const handleLoginPageRoute = useCallback(() => {
    route.push('/auth/login')
  }, [route])

  const handleMyPageRoute = useCallback(() => {
    route.push('/my')
  }, [route])

  const randerAuth = useCallback(() => {
    if (!user) {
      return (
        <Button
          onClick={handleLoginPageRoute}
          variant="contained"
          color="primary"
        >
          로그인
        </Button>
      )
    } else {
      return (
        <Button onClick={handleMyPageRoute} variant="contained" color="primary">
          마이페이지
        </Button>
      )
    }
  }, [user])
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
      <Typography
        onClick={handleWorkspaceRoute}
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
      {randerAuth()}
    </Box>
  )
}

export default TopNav
