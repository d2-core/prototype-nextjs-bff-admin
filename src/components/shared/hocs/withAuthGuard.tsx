import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useUser from '@/hooks/auth/useUser'

function withAuthGuard(Component: React.ComponentType) {
  const AuthenticatedComponent = (props: any) => {
    const { user } = useUser()
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

    useEffect(() => {
      const publicRoutes = ['/', '/auth/login', '/auth/signup']

      if (!publicRoutes.includes(router.pathname) && user == null) {
        setIsAuthenticated(false)
        router.push('/auth/login')
      } else {
        setIsAuthenticated(true)
      }
    }, [router, user])

    if (isAuthenticated === null) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <p>Loading...</p>
        </div>
      )
    }

    if (isAuthenticated) {
      return <Component {...props} />
    }

    return null
  }

  return AuthenticatedComponent
}

export default withAuthGuard
