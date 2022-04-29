import React, { Component } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import Layout, { siteTitle } from '../../../../../components/layout';
import API from '../../../../../lib/axios';
import { Container, Breadcrumb, Card, Spinner, Button, Form } from 'react-bootstrap';
import { FaSave } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import { Formik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  //name: yup.string().required()
});

class Edit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      name: '',
      nameError: '',
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
    API.GetCategoryId(id).then(res => {
      console.log(res)
      setTimeout(() => this.setState({
        id: res.data[0].id,
        name: res.data[0].name,
        loading: false
      }), 100);
    })
  }
  render() {
    //const {title,summary,body,image,date,time,created,category_id,user,user_id,url} = this.state;
    return (
      <Layout admin>
        <Head>
          <title>Edit Kategori - {siteTitle}</title>
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
              <h3 className="mb-3">Edit Kategori {this.state.name}</h3>
              <Breadcrumb className="my-3">
                <Link href="/admin" passHref><Breadcrumb.Item >Dashboard</Breadcrumb.Item></Link>
                <Link href="/admin/blog" passHref><Breadcrumb.Item >Blog</Breadcrumb.Item></Link>
                <Link href="/admin/blog/category" passHref><Breadcrumb.Item >Kategori</Breadcrumb.Item></Link>
                <Breadcrumb.Item active>Edit</Breadcrumb.Item>
              </Breadcrumb>

              <Card className="p-2" body>

                <Formik
                  initialValues={{
                    id: this.state.id,
                    name: this.state.name,
                  }}
                  onSubmit={(values, actions) => {
                    //alert(JSON.stringify(values));
                    API.PutCategory(values).then(res => {
                      //console.log(res)
                      var data = res.data
                      if (res.status == true) {
                        toast.success(res.message);
                        setTimeout(() => {
                          Router.push('/admin/blog/category');
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
                        <Form.Label>Kategori</Form.Label>
                        <Form.Control name="name" placeholder="" className="form-control" size="lg" onChange={handleChange} onBlur={handleBlur} value={values.name} isInvalid={!!this.state.nameError && touched.name} />
                        {this.state.nameError && touched.name && <Form.Control.Feedback type="invalid">{this.state.nameError}</Form.Control.Feedback>}
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