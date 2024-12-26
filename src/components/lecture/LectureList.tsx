import { Lecture } from '@/models/lecture'
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material'
import LectureAction from './LectureAction'
import ListEmpty from '../shared/ListEmpty'
import { useRouter } from 'next/router'
import { MouseEvent, RefObject } from 'react'

const exampleLectures: Lecture[] = [
  {
    id: 1,
    imageUrl:
      'https://www.investopedia.com/thmb/ckPwC5ARwco1nOSCKVGE57se8MI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1245748917-99e3329a7b8147e8ab648806220ce153.jpg',
    title: 'React 기초',
    description: 'React의 기본 개념과 JSX 소개',
    videoUrl: 'https://example.com/react-basics.m3u8',
    isPreview: true,
    isPublish: true,
    order: 1,
    duration: 30, // 분
    createdAt: '2023-01-01',
    updatedAt: '2023-01-15',
    publishedAt: '2023-01-20',
  },
  {
    id: 2,
    imageUrl:
      'https://www.investopedia.com/thmb/ckPwC5ARwco1nOSCKVGE57se8MI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1245748917-99e3329a7b8147e8ab648806220ce153.jpg',
    title: 'React 상태 관리',
    description: 'React에서의 상태 관리 및 useState 훅 활용',
    videoUrl: 'https://example.com/react-state.m3u8',
    isPreview: false,
    isPublish: false,
    order: 2,
    duration: 45, // 분
    createdAt: '2023-01-10',
    updatedAt: '2023-01-20',
    publishedAt: undefined,
  },
]

interface Props {
  ref: RefObject<HTMLDivElement>
}
function LectureList({ ref }: Props) {
  const route = useRouter()
  const isEmpty = exampleLectures.length === 0

  const handleLectureRegisterRoute = () => {
    route.push('/workspace/lecture/edit')
  }

  const handleLectureDetailRotue = (lectureId: number) => {
    route.push(`/workspace/lecture/${lectureId}`)
  }

  return (
    <Box ref={ref}>
      {isEmpty ? (
        <ListEmpty
          description="등록된 강좌가 없습니다."
          children={
            <Button
              variant="contained"
              color="primary"
              onClick={handleLectureRegisterRoute}
            >
              등록하기
            </Button>
          }
        />
      ) : (
        <Box>
          <Box
            display={'flex'}
            sx={{
              marginBottom: 4,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6">강좌 리스트</Typography>
            <Button onClick={handleLectureRegisterRoute}>등록하기</Button>
          </Box>

          <List>
            {exampleLectures.map((lecture) => (
              <ListItem
                onClick={() => handleLectureDetailRotue(lecture.id)}
                key={lecture.id}
                sx={{
                  border: (theme) => `1px solid ${theme.palette.grey[300]}`,
                  borderRadius: '8px',
                  marginBottom: '16px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.grey[100],
                  },
                }}
              >
                <Stack
                  direction="row"
                  alignItems={'center'}
                  justifyContent="space-between"
                  sx={{ marginBottom: '16px', width: '100%' }}
                >
                  {/* Lecture Title and Info */}
                  <Stack direction={'row'} alignItems={'center'}>
                    <Box
                      component="img"
                      src={lecture.imageUrl}
                      alt={lecture.title || 'thumbnail'}
                      sx={{
                        width: 200,
                        height: 150,
                        borderRadius: '4px',
                        objectFit: 'cover',
                        marginRight: '16px',
                      }}
                    />
                    <Box>
                      <Typography variant="h6">{lecture.title}</Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ marginBottom: '8px' }}
                      >
                        {lecture.description}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {lecture.duration}분
                      </Typography>
                    </Box>
                  </Stack>

                  <LectureAction lecture={lecture} />
                </Stack>

                {/* Lecture Metadata */}
                <Divider sx={{ marginY: '8px' }} />
                <Typography variant="body2" color="textSecondary">
                  생성일: {lecture.createdAt} | 업데이트일: {lecture.updatedAt}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  )
}

export default LectureList
