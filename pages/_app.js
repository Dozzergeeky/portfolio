import '../public/static/css/prism.css'
import 'remixicon/fonts/remixicon.css'

import Router from 'next/router'
import * as gtag from '../lib/gtag'
import CommandBarWrapper from '../components/CommandBarWrapper'

Router.events.on('routeChangeComplete', url => gtag.pageview(url))

const Noop = ({ children }) => children

export default function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || Noop

  return (
    <CommandBarWrapper>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CommandBarWrapper>
  )
}
