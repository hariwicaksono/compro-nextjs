import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../../../../components/layout';
import API from '../../../../libs/axios';
import { ImagesUrl } from '../../../../libs/urls';
import { Container, Row, Col, Card } from 'react-bootstrap';
import {} from 'react-icons/md';
import parse from 'html-react-parser';

class Edit extends Component {
  constructor(props){
    super(props)
    this.state = {
        id: '',
        title: '',
        body: '',
        image: '',
        date: '',
        category: '',
        user: '',
        url: ImagesUrl()
        
    }
} 
static async getInitialProps ({ query }) {
  const id = query.id

  return {
    id: id
  }
}

  componentDidMount = () => {
    const id = this.props.id
        API.GetBlogId(id).then(res=>{
          console.log(res)
            this.setState({
                id: res.data[0].id,
                title : res.data[0].title,
                body: res.data[0].body,
                images: res.data[0].post_image,
                date: res.data[0].created_at,
                category: res.data[0].category,
                user: res.data[0].user
            })
        })
}
  render() {
  const {title,body,images,date,category,user,url} = this.state;
  return (
    <Layout admin>
      <Head>
        <title>{title} - {siteTitle}</title>
      </Head>

      <Container>
      <main className="py-3">
     
      
      <Row>
        
        <Col md={12}>
        <h1>{title}</h1>
        Posted date: {date} - Category: {category} - By: {user}
        <hr/>
        <img src={url+images} className="mb-3" alt={'gambar_'+title} />
        {parse(body)}           
        </Col>
      </Row>

  </main>
  </Container>
    </Layout>
  );
}
}


export default Edit;