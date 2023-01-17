import NProgress from 'nprogress'
import Router from 'next/router'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import 'nprogress/nprogress.css'
import { ApolloProvider } from '@apollo/client'
import Header from '../components/Header'
import { useApollo } from '../lib/withApollo'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const App = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={apolloClient}>
      <Header />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default App
