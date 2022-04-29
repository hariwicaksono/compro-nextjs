import React, { Component } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import Layout, { siteTitle } from '../../../../components/layout';
import API from '../../../../lib/axios';
import { ImageUrl } from '../../../../lib/urls';
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
    API.GetServiceId(id).then(res => {
      //console.log(res)
      setTimeout(() => this.setState({
        id: res.data.id,
        title: res.data.title,
        body: res.data.body,
        image: res.data.image,
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
          <title>Edit Layanan - {siteTitle}</title>
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
              <h3 className="mb-3">Edit Layanan {this.state.title}</h3>
              <Breadcrumb className="my-3">
                <Link href="/admin" passHref><Breadcrumb.Item >Dashboard</Breadcrumb.Item></Link>
                <Link href="/admin/service" passHref><Breadcrumb.Item >Layanan</Breadcrumb.Item></Link>
                <Breadcrumb.Item active>Edit</Breadcrumb.Item>
              </Breadcrumb>

              <Card className="mb-2" body>

                <Formik
                  initialValues={{
                    id: this.state.id,
                    title: this.state.title,
                    body: this.state.body,
                  }}
                  onSubmit={(values, actions) => {
                    //alert(JSON.stringify(values));
                    API.PutService(values).then(res => {
                      //console.log(res)
                      var data = res.data;
                      if (res.status == true) {
                        toast.success(res.message);
                        setTimeout(() => {
                          Router.push('/admin/service');
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
                        <img src={this.state.url + this.state.image} width="400" alt={this.state.image} />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Judul Layanan</Form.Label>
                        <Form.Control name="title" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.title} isInvalid={!!this.state.titleError && touched.title} />
                        {this.state.titleError && touched.title && <Form.Control.Feedback type="invalid">{this.state.titleError}</Form.Control.Feedback>}
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Isi Layanan</Form.Label>
                        <Editor
                          apiKey="vffx7rg47lbz69xfs80qajyt04jjsxtihahl5gp1rsek0vnt"
                          init={{
                            height: 250,
                            menubar: false
                          }}
                          value={values.body}
                          onEditorChange={(e) => {
                            handleChange({ target: { name: 'body', value: e } })
                          }} id="body" rows="4" name="body" isInvalid={!!this.state.bodyError && touched.body} />
                        {this.state.bodyError && touched.body && <Form.Control.Feedback type="invalid">{this.state.bodyError}</Form.Control.Feedback>}
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