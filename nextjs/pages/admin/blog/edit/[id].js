import React, { Component } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import Layout, { siteTitle } from '../../../../components/layout';
import API from '../../../../libs/axios';
import { ImageUrl } from '../../../../libs/urls';
import { Container, Breadcrumb, Card, Row, Col, Spinner, Button, Form } from 'react-bootstrap';
import { FaSave, FaTrash, FaPencilAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Editor } from "@tinymce/tinymce-react";

/* const validationSchema = yup.object({
  title: yup.string().required(),
  date: yup.string().required(),
  time: yup.string().required(),
  summary: yup.string().required(),
  body: yup.string().required()
}); */

class Edit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      title: '',
      titleError: '',
      body: '',
      bodyError: '',
      image: '',
      date: '',
      dateError: '',
      time: '',
      timeError: '',
      url: ImageUrl(),
      loading: true,
      errorKeys: [],
    }
  }
  static async getInitialProps({ query }) {
    const id = query.id
    return {
      id: id
    }
  }

  componentDidMount = () => {
    const id = this.props.id
    API.GetBlogId(id).then(res => {
      //console.log(res)
      setTimeout(() => this.setState({
        id: res.data.id,
        title: res.data.title,
        summary: res.data.summary,
        body: res.data.body,
        image: res.data.post_image,
        date: res.data.date,
        time: res.data.time,
        loading: false
      }), 100);
      toast.dark(res.message);
    })
  }
  render() {
    //const {title,summary,body,image,date,time,created,category_id,user,user_id,url} = this.state;
    return (
      <Layout admin>
        <Head>
          <title>Edit Blog - {siteTitle}</title>
        </Head>
        <Container fluid>
          {this.state.loading ?
            <>
              <Skeleton width={150} height={40} className="mb-4" />
              <Skeleton count={4} height={40} className="mb-1" />
              <Skeleton width={100} height={40} />
            </>
            :
            <>
              <h3 className="mb-3">Edit Blog {this.state.title}</h3>
              <Breadcrumb className="my-3">
                <Link href="/admin" passHref><Breadcrumb.Item >Dashboard</Breadcrumb.Item></Link>
                <Link href="/admin/blog" passHref><Breadcrumb.Item >Blog</Breadcrumb.Item></Link>
                <Breadcrumb.Item active>Edit</Breadcrumb.Item>
              </Breadcrumb>

              <Card className="mb-2" body>

                <Formik
                  initialValues={{
                    id: this.state.id,
                    title: this.state.title,
                    summary: this.state.summary,
                    body: this.state.body,
                    date: this.state.date,
                    time: this.state.time
                  }}
                  onSubmit={(values, actions) => {
                    //alert(JSON.stringify(values));
                    API.PutBlog(values).then(res => {
                      //console.log(res)
                      var data = res.data;
                      if (res.status == true) {
                        toast.success(res.message);
                        setTimeout(() => {
                          Router.push('/admin/blog');
                        }, 3000);
                      } else if (res.status === 0) {
                        toast.warn(res.message);
                      } else {
                        this.errorKeys = Object.keys(data);
                        this.errorKeys.map((el) => {
                          this.setState({
                            [`${el}`]: data[el]
                          })
                        })
                        if (this.errorKeys.length > 0) {
                          setTimeout(() => this.errorKeys.map((el) => {
                            this.setState({
                              [`${el}`]: ""
                            })
                          }), 5000);
                        }
                        toast.error(res.message);
                      }

                    }).catch(err => {
                      console.log(err)
                    })
                    setTimeout(() => {
                      actions.setSubmitting(false);
                    }, 1000);
                  }}
                //validationSchema={validationSchema}
                //enableReinitialize={true}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    setFieldValue,
                    values,
                    touched,
                    errors,
                    isSubmitting
                  }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label>Gambar</Form.Label><br />
                        <img src={this.state.url + this.state.image} width="400" alt="" />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Judul Blog</Form.Label>
                        <Form.Control name="title" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.title} isInvalid={!!this.state.titleError && touched.title} />
                        {this.state.titleError && touched.title && <Form.Control.Feedback type="invalid">{this.state.titleError}</Form.Control.Feedback>}
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Row>
                          <Col>
                            <Form.Label>Tanggal</Form.Label>
                            <Form.Control type="date" name="date" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.date} isInvalid={!!this.state.dateError && touched.date} />
                            {this.state.dateError && touched.date && <Form.Control.Feedback type="invalid">{this.state.dateError}</Form.Control.Feedback>}
                          </Col>
                          <Col>
                            <Form.Label>Jam</Form.Label>
                            <Form.Control type="time" name="time" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.time} isInvalid={!!this.state.timeError && touched.time} />
                            {this.state.timeError && touched.time && <Form.Control.Feedback type="invalid">{this.state.timeError}</Form.Control.Feedback>}
                          </Col>
                        </Row>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Ringkasan</Form.Label>
                        <Editor
                          apiKey="vffx7rg47lbz69xfs80qajyt04jjsxtihahl5gp1rsek0vnt"
                          init={{
                            height: 150,
                            menubar: false
                          }}
                          value={values.summary} 
                          onEditorChange={(e) => {
                              handleChange({ target: { name: 'summary', value: e } })
                          }} id="summary" rows="2" name="summary" isInvalid={!!this.state.summaryError && touched.summary} />
                        {this.state.summaryError && touched.summary && <div className="error">{this.state.summaryError}</div>}
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Isi Blog</Form.Label>
                        <Editor
                          apiKey="vffx7rg47lbz69xfs80qajyt04jjsxtihahl5gp1rsek0vnt"
                          init={{
                            height: 250,
                            menubar: true
                          }}
                          value={values.body}
                          onEditorChange={(e) => {
                            handleChange({ target: { name: 'body', value: e } })
                          }} id="body" rows="4" name="body" isInvalid={!!this.state.bodyError && touched.body} />
                        {this.state.bodyError && touched.body && <div className="error">{this.state.bodyError}</div>}
                      </Form.Group>

                      <Button variant="primary" size="lg" type="submit" disabled={isSubmitting}>{isSubmitting ? (
                        <>
                          <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          /> Memuat...
                        </>
                      ) : (<><FaSave /> Update</>)}</Button>

                    </Form>
                  )}
                </Formik>
              </Card>
            </>
          }
        </Container>
      </Layout>
    );
  }
}

export default Edit;