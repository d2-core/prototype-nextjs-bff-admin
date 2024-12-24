import { localstorageMap } from '@/constants/localstorage'
import useUser from '@/hooks/auth/useUser'
import { authStorage } from '@/store/local'
import { Box, Button } from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

function MyPage() {
  const route = useRouter()
  const { setUser } = useUser()
  const handleHomeRoute = useCallback(() => {
    route.push('/')
  }, [route])

  const handleLogout = useCallback(() => {
    authStorage.remove(localstorageMap.AUTH.ACCESS_TOKEN)
    authStorage.remove(localstorageMap.AUTH.REFRESH_TOKEN)
    setUser(null)

    route.push('/auth/login')
  }, [route, setUser])

  return (
    <Box>
      <Button onClick={handleLogout}>로그아웃</Button>
      <Button onClick={handleHomeRoute}>Home</Button>
    </Box>
  )
}

export default MyPage
