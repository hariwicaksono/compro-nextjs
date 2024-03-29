import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../../../components/layout';
import API from '../../../lib/axios';
import { ImageUrl } from '../../../lib/urls';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { } from 'react-icons/md';
import parse from 'html-react-parser';
import Skeleton from 'react-loading-skeleton';
import FormComment from '../../../components/form-comment';
import styled from 'styled-components';

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
      date: '',
      category: '',
      user: '',
      Comments: [],
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

    API.GetBlogId(id).then(res => {
      //console.log(res)
      setTimeout(() => this.setState({
        id: res.data.id,
        title: res.data.title,
        body: res.data.body,
        image: res.data.post_image,
        date: res.data.created_at,
        category: res.data.category,
        user: res.data.user,
        loading: false
      }), 100);
    })

    API.GetCommentId(id).then(res => {
      if (res.data.length > 0) {
        this.setState({
          Comments: res.data
        })
      } else {
        this.setState({
          error: "No Data Found"
        })
      }
    }).catch(err => {
      console.log(err)
    })

  }
  render() {
    const { id, title, body, image, date, category, user, url, asset } = this.state;
    const ListComment = this.state.Comments.map((c, i) => (
      <Card className="mb-1" key={i} body>
        <h6 className="mb-0">{c.body} [by <strong>{c.name}</strong>]</h6>
      </Card>

    ))
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
                    <p>Posted date: {date} - Category: <Link href={"/tag/" + category} passHref>{category}</Link> - By: {user}</p>
                    <hr />
                    {image && <img src={url + image} className="mb-3 img-fluid" alt={'gambar_' + title} />}
                    <Post className="mb-4">{parse(body)}</Post>
                    <hr />
                    <h3>Komentar</h3>
                    {ListComment}
                    <hr />
                    <Row>
                      <Col md={8}>
                        <FormComment postID={id} />
                      </Col>
                    </Row>
                  </>
                }
              </Col>
            </Row>
        </Container>
      </Layout>
    );
  }
}


export default Detail