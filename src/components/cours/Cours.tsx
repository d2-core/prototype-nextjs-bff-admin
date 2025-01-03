import { Box, Button } from '@mui/material'
import Direction from '../shared/Direction'
import CoursList from './CoursList'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

function Cours() {
  const route = useRouter()
  const handleRegister = useCallback(() => {
    route.push('/workspace/cours/edit')
  }, [route])

  return (
    <Box>
      <Direction
        title="Cours"
        actionChildren={<Button onClick={handleRegister}>등록하기</Button>}
      />
      <CoursList />
    </Box>
  )
}

export default Cours
