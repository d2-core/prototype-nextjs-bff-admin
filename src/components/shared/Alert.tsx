import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  DialogProps,
} from '@mui/material'

interface Props extends DialogProps {
  open: boolean
  description?: React.ReactNode
  primaryButtonLabel?: string
  secondaryButtonLabel?: string
  onPrimaryButtonClick: () => void
  onSecondaryButtonClick?: () => void
  width?: string | number
  height?: string | number
}

function Alert({
  open = false,
  title,
  description,
  primaryButtonLabel = '확인',
  secondaryButtonLabel = '취소',
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  width = 400,
  height = 'auto',
  ...dialogProps
}: Props) {
  return (
    <Dialog
      open={open}
      onClose={onSecondaryButtonClick}
      {...dialogProps}
      PaperProps={{
        sx: {
          width: width,
          height: height,
          padding: 2,
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h6" component="div" gutterBottom>
          {title}
        </Typography>
      </DialogTitle>
      {description && (
        <DialogContent>
          <Typography variant="body2" color="textSecondary">
            {description}
          </Typography>
        </DialogContent>
      )}
      <DialogActions>
        <Button
          onClick={onSecondaryButtonClick}
          variant="outlined"
          color="secondary"
          sx={{ marginRight: 1 }}
        >
          {secondaryButtonLabel}
        </Button>
        <Button
          onClick={onPrimaryButtonClick}
          variant="contained"
          color="primary"
        >
          {primaryButtonLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Alert
