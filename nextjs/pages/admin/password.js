import React, { Component } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import { isLogin, isAdmin } from '../../lib/utils';
import Layout, { siteName, siteTitle } from '../../components/layout';
import API from '../../lib/axios';
import { toast } from 'react-toastify';
import { Container, Breadcrumb, Card, Row, Col, Spinner, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import Skeleton from 'react-loading-skeleton';
import { FaSave } from 'react-icons/fa';

const validationSchema = yup.object({
    //password: yup.string().required()
    //.min(8, "Kata sandi terlalu pendek - minimal 8 karakter.")
    //.matches(/(?=.*[0-9])/, "Kata sandi harus kombinasi angka dan huruf.")
    //,
});
class Password extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            password: '',
            passworError: '',
            konfirmasi_password: '',
            loading: true,
            errorKeys: [],
        }

    }

    componentDidMount = () => {
        const datas = JSON.parse(localStorage.getItem('isAdmin'))
        const id = datas.email
        API.GetUserId(id).then(res => {
            setTimeout(() => this.setState({
                id: id,
                loading: false
            }), 100);
            toast.dark(res.message);
        })
    }

    render() {
        return (
            <Layout admin>
                <Head>
                    <title>Setting - {siteTitle}</title>
                </Head>

                <Container fluid>
                    <h3 className="mb-3">Ganti Password</h3>
                    <Breadcrumb className="my-3">
                        <Link href="/admin" passHref><Breadcrumb.Item>Dashboard</Breadcrumb.Item></Link>
                        <Breadcrumb.Item active>Ganti Password</Breadcrumb.Item>
                    </Breadcrumb>

                    <Card className="p-2" body>

                        {this.state.loading ?
                            <>
                                <Skeleton count={3} height={40} className="mb-1" />
                                <Skeleton width={100} height={40} />
                            </>
                            :
                            <Formik
                                initialValues={{
                                    id: this.state.id,
                                    password: '',
                                    konfirmasi_password: ''
                                }}
                                onSubmit={(values, actions) => {
                                    //alert(JSON.stringify(values));
                                    if (values.konfirmasi_password === values.password) {
                                        API.PutUserPass(values).then(res => {
                                            //console.log(res)
                                            var data = res.data;
                                            if (res.status == true) {
                                                toast.success(res.message);
                                                setTimeout(() => {
                                                    Router.reload();
                                                }, 4000);
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
                                    } else {
                                        toast.error("Konfirmasi Password tidak sesuai");
                                    }

                                    setTimeout(() => {
                                        actions.setSubmitting(false);
                                    }, 1000);
                                }}
                                validationSchema={validationSchema}
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
                                            <Form.Label>Password Baru *</Form.Label>
                                            <Form.Control type="password" name="password" placeholder="" className="form-control" size="lg" onChange={handleChange} onBlur={handleBlur} value={values.password} isInvalid={!!this.state.passwordError && touched.password} />
                                            {this.state.passwordError && touched.password && <Form.Control.Feedback type="invalid">{this.state.passwordError}</Form.Control.Feedback>}
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Konfirmasi Password Baru</Form.Label>
                                            <Form.Control type="password" name="konfirmasi_password" placeholder="" className="form-control" size="lg" onChange={handleChange} onBlur={handleBlur} value={values.konfirmasi_password} isInvalid={!!errors.konfirmasi_password && touched.konfirmasi_password} />
                                            {errors.konfirmasi_password && touched.konfirmasi_password && <Form.Control.Feedback type="invalid">{errors.konfirmasi_password}</Form.Control.Feedback>}
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

export default Password