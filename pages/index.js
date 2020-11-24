import React, {Component} from 'react';
import Head from 'next/head';
import Layout, {siteName, siteTitle} from '../components/layout';
import {Container, Card, Row, Col, Spinner, Button, Form} from 'react-bootstrap';

class Index extends Component{
  
  render(){
        
    return(
      <Layout home>
      <Head>
        <title>Home - {siteTitle}</title>
      </Head>

      <main className="py-3">
        <Container>
<p>Welcome to the Next.js application</p>
</Container>
      </main>
      </Layout>
    );
  }
}

export default Index;