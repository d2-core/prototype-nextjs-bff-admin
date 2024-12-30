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
import { Cours } from '@/models/cours'
import Direction from '../shared/Direction'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import MUIMarkdown from '../shared/MUIMarkdown'
import LectureList from '../lecture/LectureList'
import CoursAction from './CoursAction'
import { useMemo, useRef } from 'react'
import ScrollIntoButtonGroup from '../shared/ScrollIntoButtonGroup'

// 예제 데이터 (실제 데이터는 API를 통해 받아올 수 있음)
const exampleCours: Cours = {
  id: 1,
  thumbnailImageUrls: [
    'https://www.investopedia.com/thmb/ckPwC5ARwco1nOSCKVGE57se8MI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1245748917-99e3329a7b8147e8ab648806220ce153.jpg',
  ],
  category: 'program',
  title: 'React와 TypeScript로 배우는 웹 개발',
  descriptionWithMarkdown:
    'React와 TypeScript를 활용한 모던 웹 개발 강좌입니다.',
  level: 'advanced',
  tags: ['React', 'TypeScript', '프론트엔드'],
  price: 30000,
  author: '홍길동',
  rating: 4.8,
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-05-01T00:00:00Z',
  publishedAt: '2023-03-01T00:00:00Z',
  courseStatistics: {
    studentStatistics: {
      totalStudents: 500,
      activeStudents: 450,
      completedStudents: 300,
    },
    lectureStatistics: {
      totalLectures: 10,
      totalDuration: 600,
      averageDuration: 60,
    },
  },
}

function CourseDetailPage() {
  const router = useRouter()
  const courseStatisticsRef = useRef<HTMLDivElement>(null)
  const lectureStatisticsRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const lectureListRef = useRef<HTMLDivElement>(null)

  // 데이터는 실제로는 API를 통해 받아와야 합니다.
  const course = exampleCours

  const handlePurchase = () => {
    console.log(`Purchase course: ${course.id}`)
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
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: '#FF5252',
                marginBottom: 4,
              }}
            >
              BEST
            </Typography>
            <Stack direction="row" spacing={1} sx={{ marginBottom: 4 }}>
              {course.tags.map((tag, index) => (
                <Chip key={index} label={tag} variant="outlined" />
              ))}
            </Stack>
            <Typography
              variant="h5"
              sx={{ fontWeight: 'bold', marginBottom: 4 }}
            >
              (2025) 일주일만에 합격하는 정보처리기사 실기
            </Typography>
            <Typography variant="subtitle1" sx={{ marginTop: 4 }}>
              정보처리기사 실기, 단번에 합격! 코드와 이론, 핵심만 콕 집어
              알려드립니다. 기출문제 완벽 정복! 체계적인 강의로 합격의 문을
              여세요.
            </Typography>
          </Box>
          {/* Image Section */}
          <Box
            component="img"
            src={
              'https://www.investopedia.com/thmb/ckPwC5ARwco1nOSCKVGE57se8MI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1245748917-99e3329a7b8147e8ab648806220ce153.jpg'
            }
            alt={course.title || 'thumbnail'}
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
            주말코딩
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
          {course.tags.map((tag, index) => (
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
        생성일: {course.createdAt} | 업데이트일: {course.updatedAt}
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
            {course.courseStatistics &&
              course.courseStatistics.studentStatistics.totalStudents}
            명
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1">활성 수강생 수</Typography>
          <Typography variant="h6">
            {course.courseStatistics &&
              course.courseStatistics.studentStatistics.activeStudents}
            명
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1">완료한 수강생 수</Typography>
          <Typography variant="h6">
            {course.courseStatistics &&
              course.courseStatistics.studentStatistics.completedStudents}
            명
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
            {course.courseStatistics &&
              course.courseStatistics.lectureStatistics.totalLectures}
            개
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1">총 강좌 시간</Typography>
          <Typography variant="h6">
            {course.courseStatistics &&
              (
                course.courseStatistics.lectureStatistics.totalDuration / 60
              ).toFixed(1)}
            시간
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1">평균 강좌 시간</Typography>
          <Typography variant="h6">
            {course.courseStatistics &&
              course.courseStatistics.lectureStatistics.averageDuration}
            분
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

      <MUIMarkdown markdown="" />
      <Divider sx={{ marginY: '32px' }} />

      <LectureList ref={lectureListRef} />
    </Box>
  )
}

export default CourseDetailPage
