import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../../components/layout';
import API from '../../lib/axios';
import { ImageUrl } from '../../lib/urls';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import parse from 'html-react-parser';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';
import { FaWhatsapp } from "react-icons/fa";

const Post = styled.div`
    font-size: 1.25rem;
    line-height: 1.8;
`;

class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      title: '',
      body: '',
      image: '',
      phone: '',
      url: ImageUrl(),
      loading: true
    }
  }

  static async getInitialProps({ query }) {
    const id = query.slug
    return {
      id: id
    }
  }

  componentDidMount = () => {
    const id = this.props.id
    this.setState({
      post_id: id,
    })

    API.GetServiceId(id).then(res => {
      //console.log(res)
      setTimeout(() => this.setState({
        id: res.data.id,
        title: res.data.title,
        body: res.data.body,
        image: res.data.image,
        loading: false
      }), 100);
    })

    API.GetSetting().then(res => {
      this.setState({
        phone: res.data.phone
      })
    })
  }

  render() {
    const { id, title, body, url, image, phone } = this.state;

    return (
      <Layout>
        <Head>
          <title>{title} - {siteTitle}</title>
        </Head>

        <Container className="py-4">
          <Row>
            <Col md={12}>
              {this.state.loading ?
                <>
                  <Skeleton count={4} height={40} className="mb-1" />
                  <Skeleton width={100} height={40} />
                </>
                :
                <>
                  <h1>{title}</h1>
                  <hr />
                  <Link href={'https://wa.me/' + phone + '?text=Saya%20ingin%20tanya%20Layanan%20' + encodeURIComponent(title)} passHref>
                    <a target="_blank" rel="noopener noreferrer">
                        <Button variant="success" size="lg" className="mb-3"><FaWhatsapp /> Order Sekarang</Button>
                    </a>
                  </Link>
                  <Post className="mb-4">{parse(body)}</Post>

                  {image && <img src={url + image} className="mb-3 img-fluid" alt={'gambar_' + title} />}
                </>
              }
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}

export default Detail;