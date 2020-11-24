import React, {Component} from 'react';
import Head from 'next/head';
import Layout, {siteName, siteTitle} from '../../components/layout';

class Index extends Component{
  
  render(){
        
    return(
      <Layout admin>
      <Head>
        <title>Admin - {siteTitle}</title>
      </Head>

      </Layout>
    );
  }
}

export default Index;