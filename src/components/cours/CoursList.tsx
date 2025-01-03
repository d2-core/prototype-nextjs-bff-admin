import { Box, List, ListItem, Typography, Stack } from '@mui/material'
import { useRouter } from 'next/router'
import CoursAction from './CoursAction'
import CoursFilter from './CoursFilter'
import ListEmpty from '../shared/ListEmpty'
import { useQuery } from 'react-query'
import { getCourseList } from '@/remote/api/course'
import { useStaticsContext } from '@/contexts/StaticsContext'
import { useTeacherContext } from '../../contexts/TeacherContext'
import { getTeacherCourseList } from '@/remote/api/teacher'

function CoursList() {
  const { getCourseCategory, getCourseLevel } = useStaticsContext()
  const router = useRouter()
  const { teacher } = useTeacherContext()
  const { data } = useQuery(['course-list', teacher?.id], () =>
    getTeacherCourseList({ teacherId: teacher?.id ?? 0 }),
  )
  const courses = data?.body ?? []
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
                    {getCourseCategory(item?.courseCategoryId ?? 0)?.name} |{' '}
                    {getCourseLevel(item?.courseLevelId ?? 0)?.name} |{' '}
                    {item.price ? `${item.price.toLocaleString()}원` : '무료'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    등록자: {item?.studentCount ?? 0}명 | 강의 시간:{' '}
                    {item?.duration ?? 0}
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
