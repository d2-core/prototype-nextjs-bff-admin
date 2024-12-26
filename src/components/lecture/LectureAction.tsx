import { useAlertContext } from '@/contexts/AlertContext'
import { Lecture } from '@/models/lecture'
import { Button, Stack } from '@mui/material'
import { useRouter } from 'next/router'
import { MouseEvent } from 'react'

interface Props {
  lecture: Lecture
}

function LectureAction({ lecture }: Props) {
  const route = useRouter()
  const { open } = useAlertContext()
  const handleLectureModifyRoute = (
    e: MouseEvent<HTMLButtonElement>,
    lectureId: number,
  ) => {
    e.preventDefault()
    e.stopPropagation()
    route.push(`/workspace/lecture/edit/${lectureId}`)
  }

  const handleDelete = (
    e: MouseEvent<HTMLButtonElement>,
    lectureId: number,
  ) => {
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

  const handleTogglePublish = (
    e: MouseEvent<HTMLButtonElement>,
    lectureId: number,
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

  const handlePreview = (
    e: MouseEvent<HTMLButtonElement>,
    lectureId: number,
    isPreview: boolean,
  ) => {
    e.preventDefault()
    e.stopPropagation()
    open({
      title: isPreview ? '미리보기 설정' : '미리보기 해제',
      description: isPreview
        ? '이 항목을 미리보기로 설정하시겠습니까?'
        : '이 항목의 미리보기를 해제하시겠습니까?',
      primaryButtonLabel: isPreview ? '설정' : '해제',
      secondaryButtonLabel: '취소',
      onPrimaryButtonClick: () =>
        console.log(isPreview ? '미리보기 설정 완료' : '미리보기 해제 완료'),
      onSecondaryButtonClick: () => console.log('취소'),
    })
  }

  return (
    <Stack direction="row" spacing={1}>
      <Button
        size="small"
        variant="outlined"
        onClick={(e) => handleLectureModifyRoute(e, lecture.id)}
      >
        수정
      </Button>
      <Button
        size="small"
        color="error"
        variant="outlined"
        onClick={(e) => handleDelete(e, lecture.id)}
      >
        삭제
      </Button>
      <Button
        size="small"
        variant="contained"
        color={lecture.isPublish ? 'warning' : 'primary'}
        onClick={(e) => handleTogglePublish(e, lecture.id, lecture.isPublish!)}
      >
        {lecture.isPublish ? '발행 취소' : '발행'}
      </Button>

      <Button
        size="small"
        variant="contained"
        color={lecture.isPublish ? 'warning' : 'primary'}
        onClick={(e) => handlePreview(e, lecture.id, lecture.isPreview!)}
      >
        {lecture.isPublish ? 'Preview' : 'unPreview'}
      </Button>
    </Stack>
  )
}

export default LectureAction
