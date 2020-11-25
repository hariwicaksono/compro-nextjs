import React, {Component} from 'react';
import Head from 'next/head';
import Router from 'next/router';
import Layout, {siteName, siteTitle} from '../components/layout';
import {Container, Card, Row, Col, Spinner, Button, Form} from 'react-bootstrap';
import {isAdmin} from '../libs/utils';

class Index extends Component{
  componentDidMount() {
    if (isAdmin()) {
      return( Router.push('/admin') )
    }
  }
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