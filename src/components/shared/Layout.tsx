import { CssBaseline } from '@mui/material'
import { Head } from 'next/document'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CssBaseline />
      {children}
    </>
  )
}

export default Layout
