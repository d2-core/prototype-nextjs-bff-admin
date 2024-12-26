import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogProps,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material'
import MUIMarkdown from './MUIMarkdown'
import { ChangeEvent, useEffect, useState } from 'react'

interface Props extends DialogProps {
  open: boolean
  onApplyButtonClick: () => void
  onCloseButtonClick?: () => void
  preMarkdown: string
  onMarkdownChange: (markdown: string) => void
}

function MarkdownPreviewDialog({
  open = false,
  onApplyButtonClick,
  onCloseButtonClick,
  preMarkdown,
  onMarkdownChange,
  ...dialogProps
}: Props) {
  const [markdown, setMarkdown] = useState(preMarkdown)

  const handleMarkdownChange = (e: ChangeEvent<HTMLInputElement>) => {
    const markdown = e.target.value
    setMarkdown(markdown)
    onMarkdownChange(markdown)
  }

  useEffect(() => {
    setMarkdown(preMarkdown)
  }, [preMarkdown])

  return (
    <Dialog
      open={open}
      onClose={onCloseButtonClick}
      {...dialogProps}
      fullScreen
      PaperProps={{
        sx: {
          margin: 0,
          width: 'calc(100vw - 240px)',
          height: 'calc(100vh - 240px)',
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
        },
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          marginBottom: 2,
          borderBottom: '1px solid #ddd',
          paddingBottom: 2,
        }}
      >
        <DialogTitle>
          <Typography variant="h6" component="div">
            Markdown Preview
          </Typography>
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={onApplyButtonClick}
            variant="contained"
            color="primary"
          >
            반영하기
          </Button>
        </DialogActions>
      </Box>

      <Box
        display="flex"
        flex="1"
        sx={{
          overflow: 'hidden',
        }}
      >
        <TextField
          fullWidth
          multiline
          value={markdown}
          onChange={handleMarkdownChange}
          sx={{
            flex: 1,
            overflow: 'auto',
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        />

        <Box
          sx={{
            flex: 1,
            height: '100%',
            overflowY: 'auto',
            padding: 2,
            borderLeft: '1px solid #ddd',
          }}
        >
          <MUIMarkdown markdown={markdown} />
        </Box>
      </Box>
    </Dialog>
  )
}

export default MarkdownPreviewDialog
