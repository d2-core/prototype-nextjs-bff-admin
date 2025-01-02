import CoursForm from '@/components/cours/CoursForm'
import MainBox from '@/components/shared/MainBox'
import { useRouter } from 'next/router'

function CoursModify() {
  const router = useRouter()
  const { id } = router.query

  console.log(id)
  return (
    <MainBox>
      <CoursForm id={parseInt(id as string)} />
    </MainBox>
  )
}

export default CoursModify
