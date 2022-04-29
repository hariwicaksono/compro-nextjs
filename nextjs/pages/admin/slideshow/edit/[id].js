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

const validationSchema = yup.object({
 //text_slide: yup.string().required()
});

class Edit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      image: '',
      text_slide: '',
      text_slideError: '',
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
    API.GetSlideshowId(id).then(res => {
      console.log(res)
      setTimeout(() => this.setState({
        id: res.data.id,
        image: res.data.img_slide,
        text_slide: res.data.text_slide,
        loading: false
      }), 100);
      toast.dark(res.message);
    })
  }
  render() {
    const { id, image, text_slide, text_slideError, loading, url } = this.state;
    return (
      <Layout admin>
        <Head>
          <title>Edit Slideshow - {siteTitle}</title>
        </Head>

        <Container fluid>
          {loading ?
            <>
              <Skeleton width={150} height={40} className="mb-4" />
              <Skeleton count={4} height={40} className="mb-1" />
              <Skeleton width={100} height={40} className="mb-1" />
            </>
            :
            <>
              <h3 className="mb-3">Edit Slideshow {id}</h3>
              <Breadcrumb className="my-3">
                <Link href="/admin" passHref><Breadcrumb.Item >Home</Breadcrumb.Item></Link>
                <Link href="/admin/slideshow" passHref><Breadcrumb.Item >Slideshow</Breadcrumb.Item></Link>
                <Breadcrumb.Item active>Edit</Breadcrumb.Item>
              </Breadcrumb>

              <Card className="p-2" body>
                <Formik
                  initialValues={{
                    id: id,
                    text_slide: text_slide,
                  }}
                  onSubmit={(values, actions) => {
                    //alert(JSON.stringify(values));

                    API.PutSlideshow(values).then(res => {
                      //console.log(res)
                      var data = res.data;
                      if (res.status == true) {
                        toast.success(res.message);
                        setTimeout(() => {
                          Router.push('/admin/slideshow');
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
                        <Form.Label>Gambar Slide</Form.Label><br />
                        <img src={url + image} width="600" alt={image} />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Teks Slide</Form.Label>
                        <Form.Control name="text_slide" placeholder="Text Slider" className="form-control" size="lg" onChange={handleChange} onBlur={handleBlur} value={values.text_slide} isInvalid={!!text_slideError && touched.text_slide} />
                        {text_slideError && touched.text_slide && <Form.Control.Feedback type="invalid">{text_slideError}</Form.Control.Feedback>}
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
                      ) : (<><FaSave /> Simpan</>)}</Button>

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