import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteName, siteTitle } from '../components/layout';
import API from '../lib/axios';
import { Container, Alert, Card, Row, Col, Spinner, Button, Form } from 'react-bootstrap';
import Slideshow from '../components/slideshow';
import Loader from 'react-loader';
import PostHome from '../components/post-home';
import { FaExclamationTriangle } from 'react-icons/fa';
import styled from 'styled-components';

var options = { lines: 13, length: 20, width: 10, radius: 30, scale: 0.35, corners: 1, color: '#fff', opacity: 0.25, rotate: 0, direction: 1, speed: 1, trail: 60, fps: 20, zIndex: 2e9, top: '50%', left: '50%', shadow: false, hwaccel: false, position: 'absolute' };

const Hero = styled.div`
    background-image: url('./hero.jpg') !important;
    background-position: center;
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
`;

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Slideshow: [],
      dataBlog: [],
      loading: true
    }

  }
  componentDidMount() {
    API.GetSlideshow().then(res => {
      this.setState({
        Slideshow: res.data
      })
    })

    API.GetSetting().then(res => {
      this.setState({
        hero: res.data.hero,
        lead: res.data.lead
      })
    })

    API.GetBlog().then(res => {
      setTimeout(() => this.setState({
        dataBlog: res.data,
        loading: false
      }), 100);
    })
    
  }
  render() {

    return (
      <Layout home>
        <Head>
          <title>Home - {siteTitle}</title>
        </Head>

        <Hero>
          <Container className="col-xxl-8 px-4 py-5">
            <Row className="g-5 py-5">
              {/* <Col md="6">
              <img src="" className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy" />
            </Col> */}
              <Col md="10">
                <h1 className="display-5 fw-bold lh-1 mb-3 text-white">{this.state.hero}</h1>
                <p className="lead text-white">{this.state.lead}</p>
                <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                  <Link href="/services" passHref><Button variant="primary" size="lg" type="button" className="px-4 me-md-2">Layanan kami</Button></Link>
                </div>
              </Col>
            </Row>
          </Container>
        </Hero>

        <Container className="py-4">
            {/*         <Alert variant="success">
          <small><h1 className="h5"><FaExclamationTriangle/> Informasi</h1>Selamat Datang di <strong>React Next.js App</strong> {this.props.setting.company}. Informasi lebih lanjut hubungi Telp/WA di {this.props.setting.phone} atau {this.props.setting.email}</small>
          </Alert> */}
            {/* <Slideshow data={this.state.Slideshow} /> */}

            <Row>
              <Col md="12">
                <h1 className="mb-3">Blog</h1>
                <hr />
                {this.state.loading ?
                  <Loader options={options} className="spinner" />
                  :
                  <PostHome data={this.state.dataBlog} />
                }
              </Col>
            </Row>
        </Container>
      </Layout>
    );
  }
}

export default Index;