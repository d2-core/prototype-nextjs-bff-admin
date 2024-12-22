import CoursForm from '@/components/cours/CoursForm'
import MainBox from '@/components/shared/MainBox'
import qs from 'qs'

function CoursModify() {
  const { id } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  }) as { id: string }

  return <MainBox children={<CoursForm id={Number(id)} />} />
}
export default CoursModify
