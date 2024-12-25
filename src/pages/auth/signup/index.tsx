import { adminUserRoleMap } from '@/models/form'
import { Box, Button, Link, TextField, Typography } from '@mui/material'
import validator from 'validator'
import useSignup from './useSignup'
import SelectMenu from '@/components/shared/SelectMenu'

function SignupPage() {
  const {
    defaultValues,
    register,
    watch,
    errors,
    hasSubmit,
    handleRequestAuthCode,
    handleAuthCodeCheck,
    handleSubmit,
  } = useSignup()

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        bgcolor: 'background.default',
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
          회원가입
        </Typography>
        <SelectMenu
          title="사용자 유형"
          memuMap={adminUserRoleMap}
          dfValue={defaultValues.adminUserRole}
          sx={{ marginBottom: '32px' }}
          register={{ ...register('adminUserRole') }}
        />
        <TextField
          label="닉네임"
          type="text"
          fullWidth
          error={Boolean(errors.nickname)}
          helperText={errors.nickname?.message}
          sx={{ marginBottom: '32px' }}
          {...register('nickname', {
            required: '닉네임은 필수 입력 항목입니다.',
            minLength: {
              value: 3,
              message: '닉네임을 3글자 이상 입력해주세요.',
            },
          })}
        />
        <TextField
          label="이메일"
          type="email"
          fullWidth
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          sx={{ marginBottom: '32px' }}
          {...register('email', {
            required: '이메일은 필수 입력 항목입니다.',
            validate: (value) =>
              validator.isEmail(value) || '이메일 형식을 확인해주세요.',
          })}
        />
        <TextField
          label="비밀번호"
          type="password"
          fullWidth
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          sx={{ marginBottom: '32px' }}
          {...register('password', {
            required: '비밀번호는 필수 입력 항목입니다.',
            minLength: {
              value: 8,
              message: '비밀번호를 8글자 이상 입력해주세요.',
            },
          })}
        />
        <TextField
          label="비밀번호 확인"
          type="password"
          fullWidth
          error={Boolean(errors.passwordConfirm)}
          helperText={errors.passwordConfirm?.message}
          sx={{ marginBottom: '32px' }}
          {...register('passwordConfirm', {
            required: '비밀번호 확인은 필수 입력 항목입니다.',
            validate: (value) =>
              value === watch('password') || '비밀번호가 일치하지 않습니다.',
          })}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            marginBottom: '32px',
          }}
        >
          <TextField
            label="전화 번호"
            fullWidth
            error={Boolean(errors.phoneNumber)}
            helperText={errors.phoneNumber?.message}
            sx={{ marginRight: 1 }}
            {...register('phoneNumber', {
              required: '전화번호는 필수 입력 항목입니다.',
              validate: (value) =>
                validator.isMobilePhone(value, 'ko-KR') ||
                '전화번호 형식이 올바르지 않습니다.',
            })}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{
              flexShrink: 0,
              height: '56px',
            }}
            disabled={Boolean(errors.phoneNumber)}
            onClick={() => handleRequestAuthCode(watch('phoneNumber'))}
          >
            인증번호 요청
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
          }}
        >
          <TextField
            label="인증 번호"
            fullWidth
            error={Boolean(errors.authCode) || Boolean(errors.checkAuthCodeId)}
            helperText={
              errors.authCode?.message || errors.checkAuthCodeId?.message
            }
            disabled={watch('checkAuthCodeId') !== -1}
            sx={{ marginRight: 1 }}
            {...register('authCode', {
              required: '인증 코드는 필수 입력 항목입니다.',
              minLength: {
                value: 5,
                message: '인증 코드는 5자여야 합니다.',
              },
              maxLength: {
                value: 5,
                message: '인증 코드는 5자여야 합니다.',
              },
            })}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{
              flexShrink: 0,
              height: '56px',
            }}
            disabled={
              Boolean(errors.authCode) || watch('checkAuthCodeId') !== -1
            }
            onClick={() =>
              handleAuthCodeCheck(watch('phoneNumber'), watch('authCode'))
            }
          >
            확인
          </Button>
        </Box>
        {watch('checkAuthCodeId') !== -1 && (
          <Box sx={{ marginTop: '4px', marginLeft: '16px' }}>
            <Typography variant="caption" color={'primary'}>
              인증이 완료되었습니다.
            </Typography>
          </Box>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          disabled={hasSubmit === false}
          onClick={() => handleSubmit(watch())}
          sx={{ marginTop: '32px' }}
        >
          회원가입
        </Button>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '32px',
          }}
        >
          <Typography
            align="center"
            variant="body2"
            sx={{ marginRight: '8px' }}
          >
            이미 계정이 있으신가요?
          </Typography>
          <Link href="/auth/login">
            <Typography
              variant="button"
              sx={{
                color: 'primary.main',
                cursor: 'pointer',
              }}
            >
              로그인
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default SignupPage
