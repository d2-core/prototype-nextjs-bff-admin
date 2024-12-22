import Direction from '../shared/Direction'

interface Props {
  id?: number
}

function CoursForm({ id }: Props) {
  const titleTail = id == null ? 'Register' : 'Modify'
  return <Direction title={`Cours ${titleTail}`} />
}

export default CoursForm
