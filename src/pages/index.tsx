import useUser from '@/hooks/auth/useUser'
import { Box, Button } from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

export default function Home() {
  const route = useRouter()
  const { user } = useUser()
  const handleLoginPageRoute = useCallback(() => {
    route.push('/auth/login')
  }, [route])

  const handleWorkspaceRoute = useCallback(() => {
    route.push('/workspace')
  }, [route])

  const randerAuth = useCallback(() => {
    if (user) {
      return <Button onClick={handleWorkspaceRoute}>Workspace</Button>
    } else {
      return <Button onClick={handleLoginPageRoute}>로그인</Button>
    }
  }, [route])
  return (
    <Box>
      <div>Creation Home</div>
      {randerAuth()}
    </Box>
  )
}
