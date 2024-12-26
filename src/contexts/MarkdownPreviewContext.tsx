import MarkdownPreviewDialog from '@/components/shared/MarkdownPreviewDialog'
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from 'react'
import { createPortal } from 'react-dom'

interface MarkdownPreviewOptions {
  markdown: string
  onApply: (markdown: string) => void
}

interface MarkdownPreviewContextValue {
  open: (options: MarkdownPreviewOptions) => void
}

const defaultMarkdownState: MarkdownPreviewOptions = {
  markdown: '',
  onApply: () => {},
}

const Context = createContext<MarkdownPreviewContextValue | undefined>(
  undefined,
)

export function MarkdownPreviewContextProvider({
  children,
}: {
  children: ReactNode
}) {
  const [dialogState, setDialogState] = useState({
    open: false,
    options: defaultMarkdownState,
  })

  const $portal_root =
    typeof window === 'undefined'
      ? null
      : document.getElementById('root-portal')

  const close = useCallback(() => {
    setDialogState({ open: false, options: defaultMarkdownState })
  }, [setDialogState])

  const open = useCallback(
    (options: MarkdownPreviewOptions) => {
      setDialogState({ open: true, options })
    },
    [setDialogState],
  )

  const handleApplyButtonClick = useCallback(() => {
    dialogState.options.onApply(dialogState.options.markdown)
    close()
  }, [dialogState, close])

  const handleClose = useCallback(() => {
    close()
  }, [close])

  const handleMarkdownChange = useCallback(
    (markdown: string) => {
      setDialogState((prevState) => ({
        ...prevState,
        options: { ...prevState.options, markdown },
      }))
    },
    [setDialogState],
  )

  const values = useMemo(() => ({ open }), [open])

  return (
    <Context.Provider value={values}>
      {children}
      {dialogState.open && $portal_root != null
        ? createPortal(
            <MarkdownPreviewDialog
              open={dialogState.open}
              onApplyButtonClick={handleApplyButtonClick}
              onCloseButtonClick={handleClose}
              preMarkdown={dialogState.options.markdown}
              onMarkdownChange={handleMarkdownChange}
            />,
            $portal_root,
          )
        : null}
    </Context.Provider>
  )
}

export const useMarkdownPreviewContext = () => {
  const values = useContext(Context)

  if (!values) {
    throw new Error('MarkdownPreviewContext 내부에서 사용해야 합니다.')
  }

  return values
}
