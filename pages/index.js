import React, {Component} from 'react';
import Head from 'next/head';
import Layout, {siteName, siteTitle} from '../components/layout';
import API from '../libs/axios';
import {Container, Jumbotron, Card, Row, Col, Spinner, Button, Form} from 'react-bootstrap';
import Slideshow from '../components/slideshow';
import Loader from 'react-loader';

var options = {lines: 13,length: 20,width: 10,radius: 30,scale: 0.35,corners: 1,color: '#fff',opacity: 0.25,rotate: 0,direction: 1,speed: 1,trail: 60,fps: 20,zIndex: 2e9,top: '50%',left: '50%',shadow: false,hwaccel: false,position: 'absolute'};

class Index extends Component{
  constructor(props) {
    super(props)
    this.state = {
        Slideshow: [],
        loading: true
    }
  
}
    componentDidMount() {
      API.GetSlideshow().then(res => {
        setTimeout(() => this.setState({
            Slideshow: res.data,
            loading: false
        }), 100);
    })
  }
  render(){
        
    return(
      <Layout home>
      <Head>
        <title>Home - {siteTitle}</title>
      </Head>

      <main className="py-3">
        <Container>
        
      
      { this.state.loading ?
        <Loader options={options} className="spinner" />
        :
        <Slideshow data={this.state.Slideshow} /> 
      }
        <Jumbotron className="text-center">
        <h1>Welcome to the Next.js App - IT Shop Pwt</h1>
        </Jumbotron>
        </Container>
      </main>
      </Layout>
    );
  }
}

export default Index;