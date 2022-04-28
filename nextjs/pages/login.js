import React, { Component } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import Layout, { siteName, siteTitle } from '../components/layout';
import { Container, Card, Row, Col, Spinner, Button, Form, FloatingLabel, Modal } from 'react-bootstrap';
import API from '../libs/axios';
import { ImageUrl } from '../libs/urls';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import * as yup from 'yup';

/* const validationSchema = yup.object({
  email: yup.string().email(),
}); */

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emailError: "",
      passwordError: "",
      errorKeys: [],
    }

  }

  componentDidMount = () => {
    if (localStorage.getItem('isLogin')) {
      return (Router.push('/dashboard'))
    }
  }
  render() {
    return (
      <Layout login>
        <Head>
          <title>Login - {siteTitle}</title>
        </Head>

        <Container className="py-4 my-4">
          <Modal.Dialog className="rounded-5 shadow">
            <Modal.Header className="p-5 pb-4 border-bottom-0">
              <Modal.Title className="fw-bold">Please Signin</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-5 pt-0">
              <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={(values, actions) => {
                  //alert(JSON.stringify(values)); 

                  API.PostLogin(values).then(res => {
                    var data = res.data;
                    if (res.status == true) {
                      if (res.id === "1") {
                        localStorage.setItem('isLogin', JSON.stringify(data))
                        toast.success(res.message);
                        setTimeout(() => {
                          Router.push('/')
                        }, 2000)
                      } else {
                        localStorage.setItem('isAdmin', JSON.stringify(data))
                        toast.success(res.message);
                        setTimeout(() => {
                          Router.push('/admin')
                        }, 2000);
                      }
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
                  })
                  setTimeout(() => {
                    actions.setSubmitting(false);
                  }, 1000);
                }}
                //validationSchema={validationSchema}
              >
                {({ handleSubmit, handleChange, handleBlur, values, touched, errors, isSubmitting }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <FloatingLabel
                      controlId="floatingEmail"
                      label="Alamat Email"
                      className="mb-3"
                    >
                      <Form.Control type="text" size="lg" name="email" placeholder="your@email.com" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.email} isInvalid={!!this.state.emailError && touched.email} />
                      {this.state.emailError && touched.email && <Form.Control.Feedback type="invalid">{this.state.emailError}</Form.Control.Feedback>}
                    </FloatingLabel>

                    <FloatingLabel
                      controlId="floatingPassword"
                      label="Password"
                      className="mb-3"
                    >
                      <Form.Control type="password" size="lg" name="password" placeholder="Password" className="form-control" onChange={handleChange} onBlur={handleBlur} isInvalid={!!this.state.passwordError && touched.password} />
                      {this.state.passwordError && touched.password && <Form.Control.Feedback type="invalid">{this.state.passwordError}</Form.Control.Feedback>}
                    </FloatingLabel>

                    <div className="d-grid">
                      <Button variant="primary" size="lg" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> Memuat...
                          </>
                        ) : (
                          <>Masuk</>
                        )}
                      </Button>
                    </div>
                    {/*<div className="text-center pt-3 pb-4">
          <a href="auth-recovery-email.html" className="link">Daftar akun</a> <span className="mx-2">·</span> <a href="auth-recovery-password.html" className="link">Lupa Password?</a>
        </div>*/}
                  </Form>

                )}
              </Formik>

              <div className="py-3">
                <Link href="/">
                  <a>← Kembali ke home</a>
                </Link>
              </div>

            </Modal.Body>
          </Modal.Dialog>
        </Container>
      </Layout>
    );
  }
}

export default Login;
