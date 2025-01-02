import CoursDetail from '@/components/cours/CoursDetail'
import MainBox from '@/components/shared/MainBox'
import { useRouter } from 'next/router'

function CoursDetailPage() {
  const route = useRouter()
  const { id } = route.query

  return <MainBox children={<CoursDetail id={parseInt(id as string)} />} />
}

export default CoursDetailPage
