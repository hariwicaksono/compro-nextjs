import Head from 'next/head';
import Layout, {siteName, siteTitle} from '../components/layout';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

     
    </Layout>
  )
}
