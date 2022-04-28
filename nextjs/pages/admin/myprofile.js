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

const validationSchema = yup.object({
    //name: yup.string().required('Field harus diisi'),
    //email: yup.string().required('Field harus diisi')
});

class MyProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            email: '',
            emailError: '',
            name: '',
            nameError: '',
            loading: true,
            errorKeys: [],
        }
    }

    componentDidMount = () => {
        const data = JSON.parse(localStorage.getItem('isAdmin'))
        const id = data.email
        API.GetUserId(id).then(res => {
            setTimeout(() => this.setState({
                id: res.data.id,
                email: res.data.email,
                name: res.data.name,
                loading: false
            }), 100);
            toast.dark(res.message);
        })
    }

    render() {
        return (
            <Layout admin>
                <Head>
                    <title>Profil Saya - {siteTitle}</title>
                </Head>
                <Container fluid>
                    <h3 className="mb-3">Profil Saya</h3>
                    <Breadcrumb className="mb-2">
                        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item active>Profil Saya</Breadcrumb.Item>
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
                                    email: this.state.email,
                                    name: this.state.name,
                                }}
                                onSubmit={(values, actions) => {
                                    //alert(JSON.stringify(values));
                                    API.PutUser(values).then(res => {
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
                                        console.log(err);
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
                                            <Form.Label>Email *</Form.Label>
                                            <Form.Control type="text" name="email" placeholder="" className="form-control" size="lg" onChange={handleChange} onBlur={handleBlur} value={values.email} isInvalid={!!this.state.emailError && touched.email} />
                                            {this.state.emailError && touched.email && <Form.Control.Feedback type="invalid">{this.state.emailError}</Form.Control.Feedback>}
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Nama Lengkap*</Form.Label>
                                            <Form.Control type="text" name="name" placeholder="" className="form-control" size="lg" onChange={handleChange} onBlur={handleBlur} value={values.name} isInvalid={!!this.state.nameError && touched.name} />
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

export default MyProfile;