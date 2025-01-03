import globalStyle from '@styles/globalStyle'
import { Global } from '@emotion/react'
import { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import Layout from '@/components/shared/Layout'
import { AlertContextProvider } from '@/contexts/AlertContext'
import ApiInit from '@/components/shared/ApiInit'
import UserInit from '@/components/shared/UserInit'
import withAuthGuard from '@/components/shared/hocs/withAuthGuard'
import { MarkdownPreviewContextProvider } from '@/contexts/MarkdownPreviewContext'
import { StaticsContextProvider } from '@/contexts/StaticsContext'
import { TeacherContextProvider } from '@/contexts/TeacherContext'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
})

function App({
  Component,
  pageProps: { dehydratedState, ...pageProps },
}: AppProps) {
  const AuthGaurdComponent = withAuthGuard(Component)
  return (
    <Layout>
      <Global styles={globalStyle} />
      <RecoilRoot>
        <QueryClientProvider client={client}>
          <Hydrate state={dehydratedState}>
            <AlertContextProvider>
              <MarkdownPreviewContextProvider>
                <ApiInit>
                  <StaticsContextProvider>
                    <UserInit>
                      <TeacherContextProvider>
                        <AuthGaurdComponent {...pageProps} />
                      </TeacherContextProvider>
                    </UserInit>
                  </StaticsContextProvider>
                </ApiInit>
              </MarkdownPreviewContextProvider>
            </AlertContextProvider>
          </Hydrate>
        </QueryClientProvider>
      </RecoilRoot>
    </Layout>
  )
}

export default App
