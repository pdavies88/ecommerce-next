import NProgress from 'nprogress'
import Router from 'next/router'
import type { AppContext, AppProps } from 'next/app'
import '../styles/globals.css'
import 'nprogress/nprogress.css'
import { ApolloProvider } from '@apollo/client'
import Header from '../components/Header'
import { useApollo } from '../lib/withApollo'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ShoppingCartProvider } from '../context/ShoppingCartContext'
import { SessionProvider } from 'next-auth/react'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

type CompleteProps = AppProps & {
  session: any
}

const App = ({ Component, pageProps, session }: CompleteProps) => {
  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={apolloClient}>
      <SessionProvider session={session}>
        <ShoppingCartProvider>
          <Header />
          <Component {...pageProps} />
        </ShoppingCartProvider>
      </SessionProvider>
    </ApolloProvider>
  )
}

// Set up a global routing context
App.getInitialProps = async function ({ Component, ctx }: AppContext) {
  let pageProps: any = {}
  if (Component.getInitialProps != null) {
    pageProps = await Component.getInitialProps(ctx)
  }

  pageProps.query = ctx.query
  return { pageProps }
}

export default App
