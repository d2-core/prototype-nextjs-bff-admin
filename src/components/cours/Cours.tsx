import { Box, Button } from '@mui/material'
import Direction from '../shared/Direction'
import CoursList from './CoursList'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useMarkdownPreviewContext } from '@/contexts/MarkdownPreviewContext'

function Cours() {
  const route = useRouter()
  const handleRegister = useCallback(() => {
    route.push('/workspace/cours/edit')
  }, [route])
  const { open } = useMarkdownPreviewContext()

  return (
    <Box>
      <Button
        onClick={() =>
          open({
            markdown: '미리 준다면?\n\n\n\nwefewf<br><br>',
            onApply: (markdown) => {
              console.log(markdown)
            },
          })
        }
      >
        qefwe
      </Button>
      <Direction
        title="Cours"
        actionChildren={<Button onClick={handleRegister}>등록하기</Button>}
      />
      <CoursList />
    </Box>
  )
}

export default Cours
