import { Box, BoxProps, TextField, Typography } from '@mui/material'
import { UseFormReturn } from 'react-hook-form'
import { isInt } from 'validator'

interface Props extends BoxProps {
  title: string
  fildKeys: [string, string]
  formMethod: UseFormReturn<any>
  spacing?: number
}

function RangeTextField({
  title,
  fildKeys,
  formMethod: {
    register,
    formState: { errors },
  },
  spacing = 2,
  sx,
  ...rest
}: Props) {
  return (
    <Box sx={sx} {...rest}>
      <Typography variant="subtitle1" sx={{ marginLeft: 1, marginBottom: 2 }}>
        {title}
      </Typography>
      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
        gap={spacing}
      >
        <TextField
          label={'최소'}
          fullWidth
          sx={{
            maxWidth: '48%',
          }}
          error={!!errors[fildKeys[0] as string]}
          helperText={errors[fildKeys[0] as string]?.message as string}
          {...register(fildKeys[0] as string, {
            validate: (value) =>
              isInt(value.toString()) || '0 이상의 정수만 입력',
          })}
        />

        <Typography variant="body1" sx={{ whiteSpace: 'nowrap' }}>
          ~
        </Typography>

        <TextField
          label={'최대'}
          fullWidth
          sx={{
            maxWidth: '48%',
          }}
          error={!!errors[fildKeys[1] as string]}
          helperText={errors[fildKeys[1] as string]?.message as string}
          {...register(fildKeys[1] as string, {
            validate: (value) =>
              isInt(value.toString()) || '0 이상의 정수만 입력',
          })}
        />
      </Box>
    </Box>
  )
}

export default RangeTextField
