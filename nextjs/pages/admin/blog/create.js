import React, { Component } from 'react'
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import { isLogin, isAdmin } from '../../../lib/utils';
import Layout, { siteName, siteTitle } from '../../../components/layout';
import API from '../../../lib/axios';
import { toast } from 'react-toastify';
import { Container, Breadcrumb, Card, Row, Col, Spinner, Button, Form } from 'react-bootstrap';
import { FaSave } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
//import moment from 'moment'
//import 'moment/locale/id'
import { Formik } from 'formik';
import * as yup from 'yup';
import { Editor } from "@tinymce/tinymce-react";

const validationSchema = yup.object({
    /* title: yup.string().required(),
    category_id: yup.string().required(),
    date: yup.string().required(),
    time: yup.string().required(),
    summary: yup.string().required(),
    body: yup.string().required(), */
    foto: yup.mixed().required()
});

class Create extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: '',
            category: [],
            category_id: '',
            category_idError: '',
            title: '',
            titleError: '',
            summary: '',
            summaryError: '',
            body: '',
            bodyError: '',
            date: '',
            dateError: '',
            time: '',
            timeError: '',
            foto: '',
            file: {
                foto: ''
            },
            fotoPreviewUrl: '',
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

        API.GetCategory().then(res => {
            this.setState({
                category: res.data,
                loading: false
            })
        })
    }

    render() {
        const ListCategory = this.state.category.map((b, i) => (
            <option value={b.id} key={i}>{b.name}</option>
        ))
        return (
            <Layout admin>
                <Head>
                    <title>Tambah Blog - {siteTitle}</title>
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
                            <h3 className="mb-3">Tambah Blog</h3>
                            <Breadcrumb className="my-3">
                                <Link href="/admin" passHref><Breadcrumb.Item>Dashboard</Breadcrumb.Item></Link>
                                <Link href="/admin/blog" passHref><Breadcrumb.Item>Blog</Breadcrumb.Item></Link>
                                <Breadcrumb.Item active>Tambah</Breadcrumb.Item>
                            </Breadcrumb>

                            <Card className="p-2" body>
                                <Formik
                                    initialValues={{
                                        category_id: '',
                                        user_id: this.state.id,
                                        title: '',
                                        summary: '',
                                        body: '',
                                        date: '',
                                        time: '',
                                        foto: null,
                                    }}
                                    onSubmit={(values, actions) => {
                                        //alert(JSON.stringify({
                                        //category_id: values.category_id,
                                        //user_id: this.state.id,
                                        //title: values.title,
                                        //summary: values.summary,
                                        //body: values.body,
                                        //date: values.date,
                                        //time: values.time,
                                        //foto: values.foto.name}));
                                        API.PostBlog(
                                            {
                                                category_id: values.category_id,
                                                user_id: this.state.id,
                                                title: values.title,
                                                summary: values.summary,
                                                body: values.body,
                                                date: values.date,
                                                time: values.time,
                                                foto: values.foto.name
                                            }
                                        ).then(res => {
                                            //console.log(res)
                                            var data = res.data;
                                            if (res.status == true) {
                                                toast.success(res.message);

                                                API.PostFoto(values.foto, values.foto.name).then(res => {
                                                    console.log('img_ok')
                                                    toast.success(res.message)
                                                    setTimeout(() => {
                                                        Router.push('/admin/slideshow');
                                                    }, 3000);
                                                })
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
                                    validationSchema={validationSchema}
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
                                                <Form.Label>Judul Blog</Form.Label>
                                                <Form.Control name="title" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.title} isInvalid={!!this.state.titleError && touched.title} />
                                                {this.state.titleError && touched.title && <Form.Control.Feedback type="invalid">{this.state.titleError}</Form.Control.Feedback>}
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label htmlFor="foto">Upload Gambar</Form.Label>
                                                <Form.Control type="file" className="form-control" name="foto" id="foto" onChange={(event) => {
                                                    setFieldValue("foto", event.currentTarget.files[0]);
                                                    this.setState({
                                                        fotoPreviewUrl: URL.createObjectURL(event.currentTarget.files[0])
                                                    })
                                                }
                                                } onBlur={handleBlur} isInvalid={!!errors.foto && touched.foto} />
                                                {errors.foto && touched.foto && <div className="error">{errors.foto}</div>}
                                                {this.state.fotoPreviewUrl ? <img src={this.state.fotoPreviewUrl} width="200" alt="" className="mt-2 img-fluid" /> : ""}
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Kategori</Form.Label>
                                                <Form.Select name="category_id" onChange={handleChange} onBlur={handleBlur} value={values.category_id} isInvalid={!!this.state.category_idError && touched.category_id}>
                                                    <option value="">Pilih Kategori</option>
                                                    {ListCategory}
                                                </Form.Select>
                                                {this.state.category_idError && touched.category_id && <Form.Control.Feedback type="invalid">{this.state.category_idError}</Form.Control.Feedback>}
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
                                                    }} rows="2" name="summary" isInvalid={!!this.state.summaryError && touched.summary} />
                                                {this.state.summaryError && touched.summary && <div className="error">{this.state.summaryError}</div>}
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Isi Blog</Form.Label>
                                                <Editor
                                                    apiKey="vffx7rg47lbz69xfs80qajyt04jjsxtihahl5gp1rsek0vnt"
                                                    init={{
                                                        height: 250,
                                                        menubar: false
                                                    }}
                                                    value={values.body}
                                                    onEditorChange={(e) => {
                                                        handleChange({ target: { name: 'body', value: e } })
                                                    }} rows="4" name="body" isInvalid={!!this.state.bodyError && touched.body} />
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