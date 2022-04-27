import React, { Component } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { isLogin, isAdmin } from '../../libs/utils';
import Layout, { siteName, siteTitle } from '../../components/layout';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaFileAlt, FaList, FaComment } from 'react-icons/fa';
import API from '../../libs/axios';
import Skeleton from 'react-loading-skeleton';

class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      JumlahBlog: '',
      JumlahKategori: '',
      JumlahKomentar: '',
      loading: true
    }
  }
  componentDidMount = () => {
    API.CountBlog().then(res => {
      setTimeout(() => this.setState({
        JumlahBlog: res.data,
        loading: false
      }), 100);
    })
    API.CountCategory().then(res => {
      this.setState({
        JumlahKategori: res.data
      })
    })
    API.CountComment().then(res => {
      this.setState({
        JumlahKomentar: res.data
      })
    })
  }
  render() {

    return (
      <Layout admin>
        <Head>
          <title>Admin - {siteTitle}</title>
        </Head>

        <Container fluid>
          {this.state.loading ?
            <>
              <Skeleton width={150} height={40} className="mb-4" />
              <Skeleton count={4} height={40} className="mb-1" />
            </>
            :
            <>

              <h1 className="h2 fw-bold mb-4">Dashboard</h1>

              <Row>
                <Col md={4}>
                  <Card className="shadow-sm px-3 py-2" body>
                    <Card.Title className="float-end text-primary"><FaFileAlt size="3em" /></Card.Title>
                    <h1 className="fw-bold">{this.state.JumlahBlog}</h1>
                    <h5>Blog</h5>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="shadow-sm px-3 py-2" body>
                  <Card.Title className="float-end text-info"><FaList size="3em" /></Card.Title>
                    <h1 className="fw-bold">{this.state.JumlahKategori}</h1>
                    <h5>Kategori</h5>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="shadow-sm px-3 py-2" body>
                  <Card.Title className="float-end text-warning"><FaComment size="3em" /></Card.Title>
                    <h1 className="fw-bold">{this.state.JumlahKomentar}</h1>
                    <h5>Komentar</h5>
                  </Card>
                </Col>
              </Row>
            </>
          }
        </Container>
      </Layout>
    );
  }
}

export default Admin;