import { Box, Button, css, TextField, Typography } from '@mui/material'
import { coursCategoryMap, coursLevelMap } from '@/models/form'
import Direction from '../shared/Direction'
import AddTag from '../shared/AddTag'
import SelectMenu from '../shared/SelectMenu'
import MultipleImageUpload from '../shared/MultipleImageUpload'
import { isInt } from 'validator'
import useCours from './hook/useCours'

interface Props {
  id?: number
}

const suggestions = ['React', 'JavaScript', 'TypeScript', 'Node.js', 'CSS']
function CoursForm({ id }: Props) {
  const titleTail = id == null ? 'Register' : 'Modify'
  const actionButtonTitle = id == null ? '저장하기' : '수정하기'
  const {
    defaultValues,
    register,
    watch,
    errors,
    hasSubmit,
    onAddTag,
    imagesUpload,
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
          memuMap={coursCategoryMap}
          dfValue={defaultValues.category}
          sx={{ margin: '32px 0' }}
          register={{
            ...register('category'),
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

        <TextField
          label="설명"
          type="text"
          multiline
          fullWidth
          minRows={16}
          maxRows={16}
          sx={{ marginBottom: '32px' }}
          error={!!errors.description}
          helperText={errors.description?.message}
          {...register('description', {
            required: '설명을 입력해주세요',
            minLength: {
              value: 10,
              message: '설명은 최소 5글자 이상이어야 합니다.',
            },
          })}
        />

        <SelectMenu
          title="레벨"
          memuMap={coursLevelMap}
          dfValue={defaultValues.level}
          sx={{ marginBottom: '32px' }}
          register={{
            ...register('level'),
          }}
        />

        <AddTag suggestions={suggestions} onAddTag={onAddTag} />

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
