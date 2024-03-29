import React, { Component } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { isLogin, isAdmin } from '../../lib/utils';
import Layout, { siteName, siteTitle } from '../../components/layout';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaFileAlt, FaList, FaComment, FaBriefcase } from 'react-icons/fa';
import API from '../../lib/axios';
import Skeleton from 'react-loading-skeleton';

class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      JumlahBlog: '',
      JumlahLayanan: '',
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

    API.CountService().then(res => {
      this.setState({
        JumlahLayanan: res.data
      })
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

              <Row className="mb-3">
                <Col md={6}>
                  <Card className="shadow-sm px-3 py-2" body>
                    <Card.Title className="float-end text-primary"><FaFileAlt size="3em" /></Card.Title>
                    <h1 className="fw-bold">{this.state.JumlahBlog}</h1>
                    <h5>Blog</h5>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="shadow-sm px-3 py-2" body>
                    <Card.Title className="float-end text-success"><FaBriefcase size="3em" /></Card.Title>
                    <h1 className="fw-bold">{this.state.JumlahLayanan}</h1>
                    <h5>Layanan</h5>
                  </Card>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Card className="shadow-sm px-3 py-2" body>
                    <Card.Title className="float-end text-info"><FaList size="3em" /></Card.Title>
                    <h1 className="fw-bold">{this.state.JumlahKategori}</h1>
                    <h5>Kategori</h5>
                  </Card>
                </Col>
                <Col md={6}>
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