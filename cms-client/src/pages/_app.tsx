import { ReduxProvider } from '@/redux/provider'
import '@/styles/globals.css'
import { ThemeProvider } from '@/utils/Themeprovider'
import type { AppProps } from 'next/app'
import NextTopLoader from 'nextjs-toploader';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <ThemeProvider>
        <NextTopLoader />
        <Component {...pageProps} />
      </ThemeProvider>
    </ReduxProvider>
  )
}
