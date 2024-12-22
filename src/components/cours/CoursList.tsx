import { Box, Button, List, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { MouseEvent } from 'react'

const courses: ICours[] = [
  {
    id: 1,
    title: '1',
  },
]

function CoursList() {
  const router = useRouter()
  const handleDetail = (id: number) => {
    router.push(`/cours/${id}`)
  }

  const handleModify = (e: MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation()
    router.push(`/cours/edit/${id}`)
  }

  const handleDelete = (e: MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation()
  }
  return (
    <List>
      {courses.map((item, itemIndex) => (
        <Box
          onClick={() => handleDetail(item.id)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px',
            border: (theme) => `1px solid ${theme.palette.grey[300]}`,
            borderRadius: '4px',
            margin: '0 0 32px 0',
          }}
        >
          <Typography>{item.title}</Typography>
          <Box>
            <Button onClick={(e) => handleModify(e, item.id)}>수정</Button>
            <Button onClick={(e) => handleDelete(e, item.id)}>삭제</Button>
          </Box>
        </Box>
      ))}
    </List>
  )
}

export default CoursList
