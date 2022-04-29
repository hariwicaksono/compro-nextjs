import React, { Component } from 'react'
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import { isLogin, isAdmin } from '../../../../libs/utils';
import Layout, { siteName, siteTitle } from '../../../../components/layout';
import API from '../../../../libs/axios';
import { toast } from 'react-toastify';
import { Container, Breadcrumb, Card, Row, Col, Spinner, Button, Form } from 'react-bootstrap'
import { FaSave } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
//import moment from 'moment'
//import 'moment/locale/id'
import { Formik } from 'formik'
import * as yup from 'yup'

const validationSchema = yup.object({
    //name: yup.string().required(),
});

class Create extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: '',
            name: '',
            nameError: '',
            loading: true,
            errorKeys: [],
        }
    }

    componentDidMount = () => {
        const datas = JSON.parse(localStorage.getItem('isAdmin'))
        const id = datas.id
        this.setState({
            id: id,
            loading: false
        })
    }

    render() {

        return (
            <Layout admin>
                <Head>
                    <title>Tambah Kategori - {siteTitle}</title>
                </Head>
                <Container fluid>

                    {this.state.loading ?
                        <>
                            <Skeleton count={4} height={40} className="mb-1" />
                            <Skeleton width={100} height={40} />
                        </>
                        :
                        <>
                            <h3 className="mb-3">Tambah Kategori</h3>
                            <Breadcrumb className="my-3">
                                <Link href="/admin" passHref><Breadcrumb.Item >Dashboard</Breadcrumb.Item></Link>
                                <Link href="/admin/blog" passHref><Breadcrumb.Item >Blog</Breadcrumb.Item></Link>
                                <Link href="/admin/blog/category" passHref><Breadcrumb.Item >Kategori</Breadcrumb.Item></Link>
                                <Breadcrumb.Item active>Tambah</Breadcrumb.Item>
                            </Breadcrumb>

                            <Card className="p-2" body>
                                <Formik
                                    initialValues={{
                                        user_id: this.state.id,
                                        name: ''
                                    }}
                                    onSubmit={(values, actions) => {
                                        //alert(JSON.stringify(values));
                                        API.PostCategory(values).then(res => {
                                            //console.log(res)
                                            var data = res.data;
                                            if (res.status == true) {
                                                toast.success(res.message);
                                                setTimeout(() => {
                                                    Router.push('/admin/blog/category');
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
                                                <Form.Label>Nama</Form.Label>
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
                                            ) : (<><FaSave /> Simpan</>)}</Button>

                                        </Form>
                                    )}
                                </Formik>
                            </Card>
                        </>
                    }
                </Container>
            </Layout>
        )
    }
}

export default Create;