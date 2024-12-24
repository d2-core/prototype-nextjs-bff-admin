import CoursForm from '@/components/cours/CoursForm'
import MainBox from '@/components/shared/MainBox'
import qs from 'qs'
import { useEffect, useState } from 'react'

function CoursModify() {
  const [id, setId] = useState<number>()

  useEffect(() => {
    const { id } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    }) as { id: string }
    setId(parseInt(id))
  }, [])

  return <MainBox children={<CoursForm id={Number(id)} />} />
}
export default CoursModify
