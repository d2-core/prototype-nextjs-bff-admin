import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  List,
  ListItemIcon,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import SchoolIcon from '@mui/icons-material/School'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import NotificationsIcon from '@mui/icons-material/Notifications'
import EventIcon from '@mui/icons-material/Event'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { ISideNav } from '@/models/sideNave'
import { ReactElement, ReactNode } from 'react'

const sideNavs: ISideNav[] = [
  {
    title: '강의',
    icon: <MenuBookIcon />,
    items: [
      {
        title: '등록하기',
        icon: <MenuBookIcon />,
        children: <Typography>등록 페이지</Typography>,
      },
      {
        title: '수정하기',
        icon: <MenuBookIcon />,
        children: <Typography>수정 페이지</Typography>,
      },
    ],
  },
  {
    title: '수강생',
    icon: <SchoolIcon />,
    items: [
      {
        title: '목록 보기',
        icon: <SchoolIcon />,
        children: <Typography>수강생 목록</Typography>,
      },
      {
        title: '추가하기',
        icon: <SchoolIcon />,
        children: <Typography>수강생 추가</Typography>,
      },
    ],
  },
  {
    title: '문제',
    icon: <HelpOutlineIcon />,
    items: [
      {
        title: '문제 보기',
        icon: <HelpOutlineIcon />,
        children: <Typography>문제 보기</Typography>,
      },
      {
        title: '문제 등록',
        icon: <HelpOutlineIcon />,
        children: <Typography>문제 등록</Typography>,
      },
    ],
  },
  {
    title: '해설',
    icon: <QuestionAnswerIcon />,
    items: [
      {
        title: '해설 목록',
        icon: <QuestionAnswerIcon />,
        children: <Typography>해설 목록</Typography>,
      },
    ],
  },
  {
    title: '질문',
    icon: <QuestionAnswerIcon />,
    items: [
      {
        title: '질문 보기',
        icon: <QuestionAnswerIcon />,
        children: <Typography>질문 보기</Typography>,
      },
    ],
  },
  {
    title: '알림',
    icon: <NotificationsIcon />,
    items: [
      {
        title: '알림 관리',
        icon: <NotificationsIcon />,
        children: <Typography>알림 관리</Typography>,
      },
    ],
  },
  {
    title: '이벤트',
    icon: <EventIcon />,
    items: [
      {
        title: '이벤트 등록',
        icon: <EventIcon />,
        children: <Typography>이벤트 등록</Typography>,
      },
    ],
  },
]

interface Props {
  onChangeChildren: (children: ReactNode) => void
}

function SideNav({ onChangeChildren: onChangeChildren }: Props) {
  const handleChangeView = (children: ReactNode) => {
    onChangeChildren(children)
  }
  return (
    <Box
      sx={{
        minWidth: 300,
        height: '100vh',
        overflowY: 'auto',
        borderRight: (theme) => `1px solid ${theme.palette.grey[300]}`,
        padding: '16px 16px 240px 16px',
      }}
    >
      {sideNavs.map((category, index) => (
        <Accordion key={index} defaultExpanded={index === 0}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography
              variant="h6"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              {category.icon}
              <Box component="span" sx={{ ml: 1 }}>
                {category.title}
              </Box>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {category.items.map((item, itemIndex) => (
                <Button
                  onClick={() => handleChangeView(item.children)}
                  key={itemIndex}
                  fullWidth
                  sx={{
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px',
                  }}
                >
                  <ListItemIcon sx={{ minWidth: '40px' }}>
                    {item.icon}
                  </ListItemIcon>
                  <Typography
                    sx={{
                      color: 'text.primary',
                      textDecoration: 'none',
                    }}
                  >
                    {item.title}
                  </Typography>
                </Button>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
}

export default SideNav