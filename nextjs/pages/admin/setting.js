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
            id: '',
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
                id: res.data.id,
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

                    <Card className="p-2" body>
                        {this.state.loading ?
                            <>
                                <Skeleton count={4} height={40} className="mb-1" />
                                <Skeleton width={100} height={40} />
                            </>
                            :
                            <Formik
                                initialValues={{
                                    id: this.state.id,
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
                                            toast.success(res.message);
                                            setTimeout(() => {
                                                Router.reload();
                                            }, 4000);
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
                                    values,
                                    touched,
                                    errors,
                                    isSubmitting
                                }) => (
                                    <Form noValidate onSubmit={handleSubmit}>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Nama Perusahaan *</Form.Label>
                                            <Form.Control type="text" name="company" placeholder="" className="form-control" size="lg" onChange={handleChange} onBlur={handleBlur} value={values.company} isInvalid={!!this.state.companyError && touched.company} />
                                            {this.state.companyError && touched.company && <Form.Control.Feedback type="invalid">{this.state.companyError}</Form.Control.Feedback>}
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Website</Form.Label>
                                            <Form.Control type="text" name="website" placeholder="" className="form-control" size="lg" onChange={handleChange} onBlur={handleBlur} value={values.website} isInvalid={!!this.state.websiteError && touched.website} />
                                            {this.state.websiteError && touched.website && <Form.Control.Feedback type="invalid">{this.state.websiteError}</Form.Control.Feedback>}
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Row>
                                                <Col>
                                                    <Form.Label>Telepon *</Form.Label>
                                                    <Form.Control type="text" name="phone" placeholder="" className="form-control" size="lg" onChange={handleChange} onBlur={handleBlur} value={values.phone} isInvalid={!!this.state.phoneError && touched.phone} />
                                                    {this.state.phoneError && touched.phone && <Form.Control.Feedback type="invalid">{this.state.phoneError}</Form.Control.Feedback>}
                                                </Col>
                                                <Col>
                                                    <Form.Label>Email *</Form.Label>
                                                    <Form.Control type="text" name="email" placeholder="" className="form-control" size="lg" onChange={handleChange} onBlur={handleBlur} value={values.email} isInvalid={!!this.state.emailError && touched.email} />
                                                    {this.state.emailError && touched.email && <Form.Control.Feedback type="invalid">{this.state.emailError}</Form.Control.Feedback>}
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