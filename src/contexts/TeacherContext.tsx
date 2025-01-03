import useUser from '@/hooks/auth/useUser'
import { Teacher } from '@/models/teacher'
import { getTeacher } from '@/remote/api/teacher'
import { createContext, ReactNode, useContext } from 'react'
import { useQuery } from 'react-query'

interface TeacherContextValue {
  teacher: Teacher | undefined
}

const Context = createContext<TeacherContextValue | undefined>(undefined)

interface Props {
  children: ReactNode
}
export function TeacherContextProvider({ children }: Props) {
  const { user } = useUser()
  const { data } = useQuery(
    ['teacher', user?.id],
    () => getTeacher({ adminUserId: user?.id ?? 0 }),
    { enabled: Boolean(user) },
  )

  console.log('ddd', user?.id)
  const value = {
    teacher: data?.body,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useTeacherContext() {
  const values = useContext(Context)

  if (!values) {
    throw new Error('TeacherContext 내부에서 사용해야 합니다.')
  }

  return values
}
