import { Box, Button, css, TextField, Typography } from '@mui/material'
import Direction from '../shared/Direction'
import AddTag from '../shared/AddTag'
import SelectMenu from '../shared/SelectMenu'
import MultipleImageUpload from '../shared/MultipleImageUpload'
import { isInt } from 'validator'
import useCours from './hook/useCours'
import MUIMarkdown from '../shared/MUIMarkdown'
import { useStaticsContext } from '@/contexts/StaticsContext'

interface Props {
  id?: number
}

const suggestions = ['React', 'JavaScript', 'TypeScript', 'Node.js', 'CSS']
function CoursForm({ id }: Props) {
  const titleTail = id == null ? 'Register' : 'Modify'
  const actionButtonTitle = id == null ? '저장하기' : '수정하기'
  const { courseCategories, courseLevels, coursRecommedTags } =
    useStaticsContext()

  const {
    defaultValues,
    register,
    watch,
    errors,
    hasSubmit,
    onAddTag,
    imagesUpload,
    handleDescriptionAdd,
    handleSubmit,
  } = useCours(id)

  console.log(watch())

  return (
    <Box>
      <Direction
        title={`Cours ${titleTail}`}
        actionChildren={
          <Button
            disabled={hasSubmit === false}
            onClick={() => handleSubmit(watch())}
          >
            {actionButtonTitle}
          </Button>
        }
      />
      <Box css={formContainerStyle}>
        <MultipleImageUpload upload={imagesUpload} />
        {errors.thumbnailImageFiles && (
          <Typography
            color={'red'}
            variant="caption"
            sx={{ marginTop: '4px', marginLeft: '16px' }}
          >
            {errors.thumbnailImageFiles.message}
          </Typography>
        )}
        <SelectMenu
          title="카테고리"
          memuArr={courseCategories.map((item) => ({
            id: item.id,
            name: item.name ?? '',
          }))}
          sx={{ margin: '32px 0' }}
          register={{
            ...register('courseCategoryId'),
          }}
        />

        <TextField
          label="제목"
          type="text"
          fullWidth
          sx={{ marginBottom: '32px' }}
          error={!!errors.title}
          helperText={errors.title?.message}
          {...register('title', {
            required: '제목을 입력해주세요',
            minLength: {
              value: 5,
              message: '제목은 최소 5글자 이상이어야 합니다.',
            },
          })}
        />

        <TextField
          label="부제"
          type="text"
          fullWidth
          sx={{ marginBottom: '32px' }}
          error={!!errors.subTitle}
          helperText={errors.subTitle?.message}
          {...register('subTitle', {
            required: '부제을 입력해주세요',
            minLength: {
              value: 10,
              message: '부제는 최소 10글자 이상이어야 합니다.',
            },
          })}
        />

        <Box
          display={'flex'}
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 1,
          }}
        >
          <Typography>설명</Typography>
          <Button onClick={handleDescriptionAdd}>등록하기</Button>
        </Box>

        <Box sx={{ marginBottom: 4 }}>
          <MUIMarkdown
            markdown={watch('descriptionWithMarkdown')}
            sx={{ marginBottom: 1 }}
          />
          <Typography variant="caption" sx={{ color: 'red', marginLeft: 2 }}>
            {!!errors.descriptionWithMarkdown &&
              errors.descriptionWithMarkdown?.message}
          </Typography>
        </Box>

        <SelectMenu
          title="레벨"
          memuArr={courseLevels.map((item) => ({
            id: item.id,
            name: item.name ?? '',
          }))}
          sx={{ marginBottom: '32px' }}
          register={{
            ...register('courseLevelId'),
          }}
        />

        <AddTag
          suggestions={coursRecommedTags.map((tag) => tag?.name ?? '')}
          onAddTag={onAddTag}
        />

        <TextField
          label="가격"
          type="text"
          fullWidth
          sx={{ marginBottom: '32px' }}
          error={!!errors.price}
          helperText={errors.price?.message}
          {...register('price', {
            required: '가격을 입력해주세요',
            validate: (value) =>
              isInt(value.toString()) ||
              '가격은 0 이상의 정수만 입력 가능합니다.',
          })}
        />
      </Box>
    </Box>
  )
}

const formContainerStyle = css`
  width: '100%';
  height: 100vh;
  display: flex;
  flex-direction: column;
`

export default CoursForm
