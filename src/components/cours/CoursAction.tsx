import { useAlertContext } from '@/contexts/AlertContext'
import { Cours } from '@/models/cours'
import { Button, Stack } from '@mui/material'
import { useRouter } from 'next/router'
import { MouseEvent } from 'react'

interface Props {
  cours: Cours
}

function CoursAction({ cours }: Props) {
  const route = useRouter()
  const { open } = useAlertContext()

  const handleModify = (e: MouseEvent<HTMLButtonElement>, coursId: number) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDelete = (e: MouseEvent<HTMLButtonElement>, coursId: number) => {
    e.preventDefault()
    e.stopPropagation()
    open({
      title: '삭제 확인',
      description: '이 항목을 삭제하시겠습니까?',
      primaryButtonLabel: '삭제',
      secondaryButtonLabel: '취소',
      onPrimaryButtonClick: () => console.log('삭제 완료'),
      onSecondaryButtonClick: () => console.log('삭제 취소'),
    })
  }

  const handlePublish = (
    e: MouseEvent<HTMLButtonElement>,
    coursId: number,
    isPublish: boolean,
  ) => {
    e.preventDefault()
    e.stopPropagation()
    open({
      title: isPublish ? '발행 취소 확인' : '발행 확인',
      description: isPublish
        ? '이 항목의 발행을 취소하시겠습니까?'
        : '이 항목을 발행하시겠습니까?',
      primaryButtonLabel: isPublish ? '발행 취소' : '발행',
      secondaryButtonLabel: '취소',
      onPrimaryButtonClick: () =>
        console.log(isPublish ? '발행 취소 완료' : '발행 완료'),
      onSecondaryButtonClick: () => console.log('작업 취소'),
    })
  }

  return (
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" onClick={(e) => handleModify(e, cours.id)}>
        수정
      </Button>
      <Button
        variant="outlined"
        color="error"
        onClick={(e) => handleDelete(e, cours.id)}
      >
        삭제
      </Button>
      <Button
        variant="contained"
        color={cours.publishedAt ? 'warning' : 'primary'}
        onClick={(e) => handlePublish(e, cours.id, cours?.isPublish ?? false)}
      >
        {cours.publishedAt ? '발행 취소' : '발행 하기'}
      </Button>
    </Stack>
  )
}

export default CoursAction
