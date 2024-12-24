import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'

interface AlertProps {
  open: boolean
  title: React.ReactNode
  description?: React.ReactNode
  buttonLabel?: string
  onButtonClick: () => void
}

function Alert({
  open = false,
  title,
  description,
  buttonLabel = '확인',
  onButtonClick,
}: AlertProps) {
  return (
    <Dialog open={open} onClose={onButtonClick}>
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
        <Button onClick={onButtonClick} variant="contained" color="primary">
          {buttonLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Alert
