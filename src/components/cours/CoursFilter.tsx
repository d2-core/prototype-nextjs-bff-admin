import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  css,
  debounce,
  Stack,
  SxProps,
  TextField,
  Theme,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import MultiSelectMenu from '../shared/MultiSelectMenu'
import { coursCategoryMap, coursLevelMap } from '@/models/form'
import RangeTextFiled from '../shared/RangeTextFiled'
import FilterBody from '../shared/FilterBody'

interface Props {
  onFilter: (filter: CoursFilter) => void
}

const defaultValues: CoursFilter = {
  categories: [],
  levels: [],
  minPrice: 0,
  maxPrice: 50000,
  minDuration: 0,
  maxDuration: 50,
  minEnrolledCount: 0,
  maxEnrolledCount: 2000,
  search: '',
  published: '',
  rating: [0, 5],
  startDate: '',
  endDate: '',
}

function CoursFilter({ onFilter }: Props) {
  const formMethod = useForm<CoursFilter>({
    defaultValues: defaultValues,
    mode: 'onChange',
  })

  const { control, watch, register } = formMethod

  const debouncedFilter = useCallback(
    debounce((values: CoursFilter) => {
      onFilter(values)
    }, 300),
    [onFilter],
  )

  useEffect(() => {
    debouncedFilter(watch())
  }, [watch(), debouncedFilter])

  return (
    <FilterBody>
      <Stack direction="column" spacing={4} sx={{ mb: 3, flexWrap: 'wrap' }}>
        <Box display={'flex'} alignContent={'center'} gap={2}>
          <TextField label={'제목 검색'} {...register('search')} fullWidth />
          <Button
            variant="contained"
            color="primary"
            sx={{ whiteSpace: 'nowrap' }} // 텍스트 줄바꿈 방지
          >
            검색
          </Button>
        </Box>

        <Box display={'flex'} gap={2}>
          {/* Category Filter */}
          <MultiSelectMenu
            title="카테고리"
            memuMap={coursCategoryMap}
            formMethod={formMethod}
            sx={{ width: '100%' }}
          />

          {/* Level Filter */}
          <MultiSelectMenu
            title="레벨"
            memuMap={coursLevelMap}
            formMethod={formMethod}
            sx={{ width: '100%' }}
          />
        </Box>

        <Box display={'flex'} gap={2}>
          <RangeTextFiled
            title="가격"
            fildKeys={['minPrice', 'maxPrice']}
            formMethod={formMethod}
            sx={rangeStyle}
          />

          <RangeTextFiled
            title="강의 시간"
            fildKeys={['minDuration', 'maxDuration']}
            formMethod={formMethod}
            sx={rangeStyle}
          />

          <RangeTextFiled
            title="수강생 수"
            fildKeys={['minEnrolledCount', 'maxEnrolledCount']}
            formMethod={formMethod}
            sx={rangeStyle}
          />
        </Box>

        {/* Text Search */}

        {/* Date Range */}

        <Box display={'flex'} gap={2}>
          <TextField
            label="시작 날짜"
            type="date"
            {...register('startDate')}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            label="종료 날짜"
            type="date"
            {...register('endDate')}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      </Stack>
    </FilterBody>
  )
}

const rangeStyle: SxProps<Theme> = {
  border: (theme) => `1px solid ${theme.palette.grey[300]}`,
  borderRadius: 2,
  padding: 2,
}

export default CoursFilter
