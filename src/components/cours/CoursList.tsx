import { Box, List, ListItem, Typography, Stack } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import CoursAction from './CoursAction'
import { Cours } from '@/models/cours'
import CoursFilter from './CoursFilter'
import ListEmpty from '../shared/ListEmpty'

const initialCourses: Cours[] = [
  {
    id: 1,
    thumbnailImageUrls: [
      'https://www.investopedia.com/thmb/ckPwC5ARwco1nOSCKVGE57se8MI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1245748917-99e3329a7b8147e8ab648806220ce153.jpg',
    ],
    category: 'program',
    title: 'React와 TypeScript로 배우는 웹 개발',
    description: 'React와 TypeScript를 활용한 모던 웹 개발 강좌입니다.',
    level: 'advanced',
    tags: ['React', 'TypeScript', '프론트엔드'],
    price: 30000,
    duration: 12,
    author: '홍길동',
    rating: 4.8,
    enrolledCount: 1234,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-05-01T00:00:00Z',
    publishedAt: undefined,
  },
  {
    id: 2,
    thumbnailImageUrls: [
      'https://www.investopedia.com/thmb/ckPwC5ARwco1nOSCKVGE57se8MI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1245748917-99e3329a7b8147e8ab648806220ce153.jpg',
    ],
    category: 'design',
    title: 'UI/UX 디자인의 모든 것',
    description: '디자인 초보자를 위한 실습 중심 강좌입니다.',
    level: 'beginner',
    tags: ['디자인', 'UI', 'UX'],
    price: 20000,
    duration: 8,
    author: '김디자이너',
    rating: 4.5,
    enrolledCount: 564,
    createdAt: '2023-02-01T00:00:00Z',
    updatedAt: '2023-05-10T00:00:00Z',
    publishedAt: '2023-05-15T00:00:00Z',
  },
]

function CoursList() {
  const router = useRouter()
  const [courses] = useState(initialCourses)

  const handleDetail = (id: number) => {
    router.push(`/workspace/cours/${id}`)
  }

  const handleFilter = (filter: CoursFilter) => {
    console.log(filter)
  }

  const isEmpty = courses.length === 0

  return (
    <Box sx={{ padding: '16px' }}>
      <CoursFilter onFilter={handleFilter} />
      {/* 리스트 */}
      <Typography variant="h6" sx={{ marginBottom: 4 }}>
        리스트
      </Typography>

      {isEmpty ? (
        <ListEmpty description="등록된 강의가 없습니다." children={undefined} />
      ) : (
        <List sx={{ padding: 0 }}>
          {courses.map((item) => (
            <ListItem
              key={item.id}
              onClick={() => handleDetail(item.id!)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                border: (theme) => `1px solid ${theme.palette.grey[300]}`,
                borderRadius: '4px',
                marginBottom: '16px',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.grey[100],
                },
              }}
            >
              {/* 코스 정보 */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  component="img"
                  src={item.thumbnailImageUrls[0] || '/placeholder-image.png'}
                  alt={item.title || 'thumbnail'}
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '4px',
                    objectFit: 'cover',
                  }}
                />
                <Box>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.category} | {item.level} |{' '}
                    {item.price ? `${item.price.toLocaleString()}원` : '무료'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    등록자: {item.enrolledCount}명 | 강의 시간: {item.duration}
                    시간
                  </Typography>
                </Box>
              </Stack>

              {/* 버튼 그룹 */}
              <CoursAction cours={item} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  )
}

export default CoursList
