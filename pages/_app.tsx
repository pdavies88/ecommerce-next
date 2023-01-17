import NProgress from 'nprogress'
import Router from 'next/router'
import type { AppContext, AppProps } from 'next/app'
import '../styles/globals.css'
import 'nprogress/nprogress.css'
import { ApolloProvider } from '@apollo/client'
import withData from '../lib/withApollo'
import Header from '../components/Header'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

type ApolloProps = AppProps & {
  apollo: any
}

function App ({ Component, pageProps, apollo }: ApolloProps) {
  return (
    <ApolloProvider client={apollo}>
      <Header />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

App.getInitialProps = async function ({ Component, ctx }: AppContext) {
  let pageProps: any = {}
  if (Component.getInitialProps != null) {
    pageProps = await Component.getInitialProps(ctx)
  }

  pageProps.query = ctx.query
  return { pageProps }
}

// withApollo is JS
// @ts-expect-error
export default withData(App)
