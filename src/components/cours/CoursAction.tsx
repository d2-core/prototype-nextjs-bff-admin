import { useAlertContext } from '@/contexts/AlertContext'
import { Cours, CoursePublishState } from '@/models/cours'
import { deleteCourse, publishCourse } from '@/remote/api/course'
import { Button, Stack } from '@mui/material'
import { useRouter } from 'next/router'
import { MouseEvent } from 'react'
import { useMutation } from 'react-query'

interface Props {
  cours: Cours | undefined
}

const publishMenuArr = [
  {
    id: 'PUBLISH',
    name: '발행하기',
  },
  {
    id: 'UN_PUBLISH',
    name: '발행취소',
  },
]

function CoursAction({ cours }: Props) {
  const route = useRouter()
  const { open } = useAlertContext()

  const deleteCourseMutation = useMutation(deleteCourse, {
    onSuccess: () => route.push('/workspace/cours'),
  })

  const publishCourseMutation = useMutation(publishCourse, {
    onSuccess: () => route.push('/workspace/cours'),
  })

  const a = publishMenuArr.find(
    (publish) => publish.id === cours?.publishState,
  )?.id

  const handleModify = (e: MouseEvent<HTMLButtonElement>, coursId: number) => {
    e.preventDefault()
    e.stopPropagation()
    route.push(`/workspace/cours/edit/${coursId}`)
  }

  const handleDelete = (e: MouseEvent<HTMLButtonElement>, coursId: number) => {
    e.preventDefault()
    e.stopPropagation()
    open({
      title: '삭제 확인',
      description: '이 항목을 삭제하시겠습니까?',
      primaryButtonLabel: '삭제',
      secondaryButtonLabel: '취소',
      onPrimaryButtonClick: () =>
        deleteCourseMutation.mutate({ courseId: coursId }),
      onSecondaryButtonClick: () => {},
    })
  }

  const handlePublish = (
    e: MouseEvent<HTMLButtonElement>,
    courseId: number,
    publishState: CoursePublishState,
  ) => {
    e.preventDefault()
    e.stopPropagation()

    const isPublishing = publishState === 'PUBLISH'
    const title = isPublishing ? '발행 확인' : '발행 취소 확인'
    const description = isPublishing
      ? '이 항목을 발행하시겠습니까?'
      : '이 항목의 발행을 취소하시겠습니까?'
    const primaryButtonLabel = isPublishing ? '발행' : '발행 취소'

    open({
      title,
      description,
      primaryButtonLabel,
      secondaryButtonLabel: '취소',
      onPrimaryButtonClick: () => {
        publishCourseMutation.mutate({
          courseId,
          publishState,
        })
      },
      onSecondaryButtonClick: () => {}, // 빈 함수 처리
    })
  }

  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="outlined"
        onClick={(e) => handleModify(e, cours?.id ?? 0)}
      >
        수정
      </Button>
      <Button
        variant="outlined"
        color="error"
        onClick={(e) => handleDelete(e, cours?.id ?? 0)}
      >
        삭제
      </Button>

      <Button
        variant="outlined"
        color="error"
        onClick={(e) =>
          handlePublish(
            e,
            cours?.id ?? 0,
            cours?.publishState === 'PUBLISH' ? 'UN_PUBLISH' : 'PUBLISH',
          )
        }
      >
        {cours?.publishState === 'PUBLISH' ? '발행취소' : '발행하기'}
      </Button>
    </Stack>
  )
}

export default CoursAction
