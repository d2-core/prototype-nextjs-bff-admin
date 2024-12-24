import { localstorageMap } from '@/constants/localstorage'
import useUser from '@/hooks/auth/useUser'
import { getUser } from '@/remote/api/auth'
import { authStorage as authLocalStorage } from '@/store/local'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

function UserInit({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const { user, setUser } = useUser()
  const [init, setInit] = useState<boolean>(false)

  const { data, isFetching } = useQuery(['user'], getUser, {
    enabled: Boolean(accessToken) && !Boolean(user),
    onSuccess: (data) => {
      if (data?.body) {
        setUser(data.body)
      }
    },
    onError: () => {
      setInit(true)
    },
  })

  useEffect(() => {
    const token = authLocalStorage.get(localstorageMap.AUTH.ACCESS_TOKEN)
    setAccessToken(token)

    if (!token || (!isFetching && data)) {
      setInit(true)
    }
  }, [data, isFetching])

  if (!init) {
    return null
  }

  return <>{children}</>
}

export default UserInit
