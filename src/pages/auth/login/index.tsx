import { Box, Button, Link, TextField, Typography } from '@mui/material'
import validator from 'validator'
import useLogin from './useLogin'

function LoginPage() {
  const {
    register,
    watch,
    errors,
    hasSubmit,
    handleSubmit,
    serverErrorMessage,
  } = useLogin()

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: 400,
          padding: '24px',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '8px',
        }}
      >
        <Typography variant="h5" align="center" sx={{ marginBottom: '32px' }}>
          로그인
        </Typography>
        <TextField
          label="이메일"
          type="email"
          fullWidth
          sx={{ marginBottom: '32px' }}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          {...register('email', {
            validate: (value) =>
              validator.isEmail(value) || '이메일 형식을 확인해주세요.',
          })}
        />
        <TextField
          label="비밀번호"
          type="password"
          fullWidth
          sx={{ marginBottom: '32px' }}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          {...register('password')}
        />
        <Button
          disabled={hasSubmit === false}
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          onClick={() => handleSubmit(watch())}
        >
          로그인
        </Button>
        <Typography
          variant="body2"
          color="error"
          align="center"
          sx={{ marginTop: '8px' }}
        >
          {serverErrorMessage}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '32px',
          }}
        >
          <Typography
            align="center"
            variant="body2"
            sx={{ marginRight: '8px' }}
          >
            계정이 없으신가요?
          </Typography>
          <Link href="/auth/signup">
            <Typography
              variant="button"
              sx={{
                color: 'primary.main',
                cursor: 'pointer',
              }}
            >
              회원가입
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default LoginPage
