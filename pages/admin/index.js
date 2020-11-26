import React, {Component} from 'react';
import Head from 'next/head';
import Router from 'next/router';
import {isLogin, isAdmin} from '../../libs/utils';
import Layout, {siteName, siteTitle} from '../../components/layout';

class Index extends Component{
  componentDidMount = () => {
    if (!isAdmin()) {
      return( Router.push('/login') )
    }
  }
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