import React, {Component} from 'react';
import Head from 'next/head';
import Layout, {siteName, siteTitle} from '../components/layout';
import API from '../libs/axios';
import {Container, Alert, Card, Row, Col, Spinner, Button, Form} from 'react-bootstrap';
import Slideshow from '../components/slideshow';
import Loader from 'react-loader';
import Blog from '../components/posts';
import {FaExclamationTriangle} from 'react-icons/fa';

var options = {lines: 13,length: 20,width: 10,radius: 30,scale: 0.35,corners: 1,color: '#fff',opacity: 0.25,rotate: 0,direction: 1,speed: 1,trail: 60,fps: 20,zIndex: 2e9,top: '50%',left: '50%',shadow: false,hwaccel: false,position: 'absolute'};

class Index extends Component{
  constructor(props) {
    super(props)
    this.state = {
        Slideshow: [],
        Posts: [],
        loading: true
    }
  
}
    componentDidMount() {
      API.GetSlideshow().then(res => {
          this.setState({
              Slideshow: res.data
          })
      })
      API.GetBlog().then(res => {
        setTimeout(() => this.setState({
            Posts: res.data,
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
        <Alert variant="success">
          <small><h1 className="h5"><FaExclamationTriangle/> Informasi</h1>Selamat Datang di <strong>React Next.js App</strong> {this.props.setting.company}. Informasi lebih lanjut hubungi Telp/WA di {this.props.setting.phone} atau {this.props.setting.email}</small>
          </Alert>
        <Slideshow data={this.state.Slideshow} /> 
        
        <Row>
          <Col md="12">
          <h1>Blog</h1>
          { this.state.loading ?
          <Loader options={options} className="spinner" />
          :
            <Blog data={this.state.Posts} />
          }
          </Col>
        </Row>
        
        </Container>
      </main>
      </Layout>
    );
  }
}

export default Index;