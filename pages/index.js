import React, {Component} from 'react';
import Head from 'next/head';
import Layout, {siteName, siteTitle} from '../components/layout';

class Index extends Component{
  
  render(){
        
    return(
      <Layout home>
      <Head>
        <title>Home - {siteTitle}</title>
      </Head>

      </Layout>
    );
  }
}

export default Index;