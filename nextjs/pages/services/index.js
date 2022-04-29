import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteName, siteTitle } from '../../components/layout';
import { Container, Card, Row, Col, Spinner, Button, Form } from 'react-bootstrap';
import Loader from 'react-loader';
import API from '../../lib/axios';
import PostService from '../../components/post-services';

var options = { lines: 13, length: 20, width: 10, radius: 30, scale: 0.35, corners: 1, color: '#fff', opacity: 0.25, rotate: 0, direction: 1, speed: 1, trail: 60, fps: 20, zIndex: 2e9, top: '50%', left: '50%', shadow: false, hwaccel: false, position: 'absolute' };

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataServices: [],
      Pengaturan: [],
      loading: true
    }
  }

  componentDidMount = () => {
    API.GetService().then(res => {
      setTimeout(() => this.setState({
        dataServices: res.data,
        loading: false
      }), 100);
    })

    API.GetSetting().then(res => {
      this.setState({
        Pengaturan: res.data
      })
    })
  }

  render() {

    return (
      <Layout>
        <Head>
          <title>Layanan Kami - {siteTitle}</title>
        </Head>

        <Container className="py-3">
          {this.state.loading ?
            <Loader options={options} className="spinner" />
            :
            <>
              <h1 className="h2">Semua Layanan</h1><hr />
              <PostService data={this.state.dataServices} setting={this.state.Pengaturan} />
            </>
          }
        </Container>
      </Layout>
    );
  }
}

export default Index;