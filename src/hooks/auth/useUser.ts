import { userAtom } from '@/store/atom/user'
import { useRecoilValue, useSetRecoilState } from 'recoil'

function useUser() {
  return {
    user: useRecoilValue(userAtom),
    setUser: useSetRecoilState(userAtom),
  }
}

export default useUser
