import React, { Component } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { isLogin, isAdmin } from '../../libs/utils';
import Layout, { siteName, siteTitle } from '../../components/layout';
import API from '../../libs/axios';
import { toast } from 'react-toastify';
import { Container, Breadcrumb, Card, Row, Col, Spinner, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import Skeleton from 'react-loading-skeleton';
import { FaSave } from 'react-icons/fa';

/* const validationSchema = yup.object({
    company: yup.string().required('Field harus diisi'),
    website: yup.string().required('Field harus diisi'),
    phone: yup.string().required('Field harus diisi'),
    email: yup.string().required('Field harus diisi')
  }); */

class Setting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            company: '',
            companyError: '',
            website: '',
            websiteError: '',
            phone: '',
            phoneError: '',
            email: '',
            emailError: '',
            loading: true,
            errorKeys: []
        }

    }

    componentDidMount = () => {
        API.GetSetting().then(res => {
            setTimeout(() => this.setState({
                company: res.data.company,
                website: res.data.website,
                phone: res.data.phone,
                email: res.data.email,
                loading: false
            }), 100);
        })
    }

    render() {
        return (
            <Layout admin>
                <Head>
                    <title>Setting - {siteTitle}</title>
                </Head>
                <Container fluid>
                    <h3 className="mb-3">Pengaturan</h3>
                    <Breadcrumb className="mb-2">
                        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item active>Pengaturan</Breadcrumb.Item>
                    </Breadcrumb>

                    <Card body>

                        {this.state.loading ?
                            <>
                                <Skeleton count={4} height={40} className="mb-1" />
                                <Skeleton width={100} height={40} />
                            </>
                            :
                            <Formik
                                initialValues={{
                                    company: this.state.company,
                                    website: this.state.website,
                                    phone: this.state.phone,
                                    email: this.state.email
                                }}
                                onSubmit={(values, actions) => {
                                    //alert(JSON.stringify(values));

                                    API.PutSetting(values).then(res => {
                                        //console.log(res)
                                        var data = res.data;
                                        if (res.status == true) {
                                            toast.success(res.message, { position: "top-center" });
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
                                            toast.dark(res.message, { position: "top-center" });
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
                                    values,
                                    touched,
                                    errors,
                                    isSubmitting
                                }) => (
                                    <Form noValidate onSubmit={handleSubmit}>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Nama Perusahaan *</Form.Label>
                                            <Form.Control type="text" name="company" placeholder="" className="form-control" size="lg" onChange={handleChange} onBlur={handleBlur} value={values.company} isInvalid={!!errors.company && touched.company} />
                                            {errors.company && touched.company && <Form.Control.Feedback type="invalid">{errors.company}</Form.Control.Feedback>}
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Website</Form.Label>
                                            <Form.Control type="text" name="website" placeholder="" className="form-control" size="lg" onChange={handleChange} onBlur={handleBlur} value={values.website} isInvalid={!!errors.website && touched.website} />
                                            {errors.website && touched.website && <Form.Control.Feedback type="invalid">{errors.website}</Form.Control.Feedback>}
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Row>
                                                <Col>
                                                    <Form.Label>Telepon *</Form.Label>
                                                    <Form.Control type="text" name="phone" placeholder="" className="form-control" size="lg" onChange={handleChange} onBlur={handleBlur} value={values.phone} isInvalid={!!errors.phone && touched.phone} />
                                                    {errors.phone && touched.phone && <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>}
                                                </Col>
                                                <Col>
                                                    <Form.Label>Email *</Form.Label>
                                                    <Form.Control type="text" name="email" placeholder="" className="form-control" size="lg" onChange={handleChange} onBlur={handleBlur} value={values.email} isInvalid={!!errors.email && touched.email} />
                                                    {errors.email && touched.email && <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>}
                                                </Col>
                                            </Row>
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
                        }
                    </Card>
                </Container>
            </Layout>
        )
    }
}

export default Setting;