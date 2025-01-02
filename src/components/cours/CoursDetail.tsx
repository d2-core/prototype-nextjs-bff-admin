import {
  Box,
  Typography,
  Chip,
  Stack,
  Divider,
  Button,
  Rating,
} from '@mui/material'
import { useRouter } from 'next/router'
import Direction from '../shared/Direction'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import MUIMarkdown from '../shared/MUIMarkdown'
import LectureList from '../lecture/LectureList'
import CoursAction from './CoursAction'
import { useMemo, useRef } from 'react'
import ScrollIntoButtonGroup from '../shared/ScrollIntoButtonGroup'
import { useQueries } from 'react-query'
import { getCourse, getCourseTeacher } from '@/remote/api/course'

interface Props {
  id: number
}

function CourseDetailPage({ id }: Props) {
  const router = useRouter()
  const courseStatisticsRef = useRef<HTMLDivElement>(null)
  const lectureStatisticsRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const lectureListRef = useRef<HTMLDivElement>(null)

  const result = useQueries([
    {
      queryKey: ['course', id],
      queryFn: () => getCourse({ courseId: id }),
    },
    {
      queryKey: ['course-taechers'],
      queryFn: () => getCourseTeacher({ courseId: id }),
    },
  ])

  const course = result[0].data?.body
  const teacher = result[1].data?.body

  const handlePurchase = () => {
    console.log(`Purchase course: ${course?.id}`)
  }

  const scrollIntos = useMemo(
    () => [
      {
        label: '코스 통계',
        ref: courseStatisticsRef,
      },
      {
        label: '강좌 통계',
        ref: lectureStatisticsRef,
      },
      {
        label: '설명',
        ref: descriptionRef,
      },
      {
        label: '강좌 리스트',
        ref: lectureListRef,
      },
    ],
    [courseStatisticsRef, lectureStatisticsRef, descriptionRef, lectureListRef],
  )

  return (
    <Box>
      <Direction
        title="Course Detail"
        actionChildren={<CoursAction cours={course} />}
      />

      <Box>
        {/* Header Section */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 4,
          }}
        >
          <Box sx={{ marginRight: 16 }}>
            <Stack direction="row" spacing={1} sx={{ marginBottom: 4 }}>
              {course?.tags.map((tag, index) => (
                <Chip key={index} label={tag} variant="outlined" />
              ))}
            </Stack>
            <Typography
              variant="h5"
              sx={{ fontWeight: 'bold', marginBottom: 4 }}
            >
              {course?.title}
            </Typography>
            <Typography variant="subtitle1" sx={{ marginTop: 4 }}>
              {course?.subTitle}
            </Typography>
          </Box>
          {/* Image Section */}
          <Box
            component="img"
            src={course?.thumbnailImageUrls[0]}
            alt={course?.title || 'thumbnail'}
            width={300}
            height={200}
            sx={{
              borderRadius: 1,
              objectFit: 'cover',
            }}
          />
        </Box>

        {/* Username with Crown Icon */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
          <AccountCircleIcon
            sx={{ fontSize: 30, marginRight: 1, color: '#A0A0A0' }}
          />
          <Typography sx={{ fontSize: 18, fontWeight: 'bold' }}>
            {teacher?.name}
          </Typography>
          <EmojiEventsIcon
            sx={{
              fontSize: 18,
              marginLeft: 0.5,
              color: '#FFD700', // Gold color for the crown
            }}
          />
        </Box>

        {/* Ratings Section */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 4,
          }}
        >
          <Rating
            value={4.8}
            precision={0.1}
            readOnly
            sx={{ color: '#FFD700' }}
          />
          <Typography sx={{ marginLeft: 1, fontWeight: 'bold' }}>
            4.8
          </Typography>
          <Typography sx={{ marginLeft: 2 }}>수강평 139개</Typography>
          <Typography sx={{ marginLeft: 2 }}>수강생 1,716명</Typography>
        </Box>

        {/* Tags Section */}
        <Stack direction="row" spacing={1} sx={{ marginBottom: 4 }}>
          {course?.tags.map((tag, index) => (
            <Chip key={index} label={tag} variant="outlined" />
          ))}
        </Stack>

        {/* Pricing Section */}
        <Box
          sx={{
            padding: 3,
            borderRadius: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: (theme) => `1px solid ${theme.palette.grey[300]}`,
            marginBottom: 4,
          }}
        >
          <Typography variant="h5">월 ₩16,500</Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#FF5252',
              '&:hover': { backgroundColor: '#E63946' },
            }}
          >
            15개 무료 보기 ▶
          </Button>
        </Box>
      </Box>

      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ marginBottom: 4 }}
      >
        생성일: {course?.createdAt} | 업데이트일: {course?.updatedAt}
      </Typography>

      <ScrollIntoButtonGroup scrollIntos={scrollIntos} />

      {/* 강의 통계 */}
      <Divider sx={{ marginY: '32px' }} />
      <Typography
        variant="h6"
        sx={{ marginBottom: '16px' }}
        ref={courseStatisticsRef}
      >
        코스 통계
      </Typography>
      <Stack direction="row" spacing={4}>
        <Box>
          <Typography variant="body1">전체 수강생 수</Typography>
          <Typography variant="h6">
            {/* {course.courseStatistics &&
              course.courseStatistics.studentStatistics.totalStudents} */}
            0명
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1">활성 수강생 수</Typography>
          <Typography variant="h6">
            {/* {course.courseStatistics &&
              course.courseStatistics.studentStatistics.activeStudents} */}
            0명
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1">완료한 수강생 수</Typography>
          <Typography variant="h6">
            {/* {course.courseStatistics &&
              course.courseStatistics.studentStatistics.completedStudents} */}
            0명
          </Typography>
        </Box>
      </Stack>

      {/* 렉처 통계 */}
      <Divider sx={{ marginY: '32px' }} />
      <Typography
        variant="h6"
        sx={{ marginBottom: '16px' }}
        ref={lectureListRef}
      >
        강의 통계
      </Typography>
      <Stack direction="row" spacing={4}>
        <Box>
          <Typography variant="body1">전체 렉처 수</Typography>
          <Typography variant="h6">
            {/* {course.courseStatistics &&
              course.courseStatistics.lectureStatistics.totalLectures} */}
            0개
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1">총 강좌 시간</Typography>
          <Typography variant="h6">
            {/* {course.courseStatistics &&
              (
                course.courseStatistics.lectureStatistics.totalDuration / 60
              ).toFixed(1)} */}
            0시간
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1">평균 강좌 시간</Typography>
          <Typography variant="h6">
            {/* {course.courseStatistics &&
              course.courseStatistics.lectureStatistics.averageDuration} */}
            0분
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ marginY: '32px' }} />
      <Typography
        variant="h6"
        sx={{ marginBottom: '16px' }}
        ref={descriptionRef}
      >
        설명
      </Typography>

      <MUIMarkdown markdown={course?.descriptionWithMarkdown ?? ''} />
      <Divider sx={{ marginY: '32px' }} />

      <LectureList ref={lectureListRef} />
    </Box>
  )
}

export default CourseDetailPage
