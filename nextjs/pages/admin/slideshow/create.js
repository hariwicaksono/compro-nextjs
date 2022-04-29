import React, { Component } from 'react'
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import { isLogin, isAdmin } from '../../../libs/utils';
import Layout, { siteName, siteTitle } from '../../../components/layout';
import API from '../../../libs/axios';
import { toast } from 'react-toastify';
import { Container, Breadcrumb, Card, Row, Col, Spinner, Button, Form } from 'react-bootstrap'
import { FaSave } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
//import moment from 'moment'
//import 'moment/locale/id'
import { Formik } from 'formik'
import * as yup from 'yup'

const validationSchema = yup.object({
//text_slide: yup.string().required(),
foto: yup.mixed().required()
});

class Create extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text_slide: '',
            text_slideError: '',
            foto: '',
            fotoError: '',
            file: {
                foto: ''
            },
            fotoPreviewUrl: '',
            errorKeys: [],
        }
    }

    componentDidMount = () => {

    }

    render() {
        const{text_slideError, fotoError} = this.state;
        return (
            <Layout admin>
                <Head>
                    <title>Tambah Slideshow - {siteTitle}</title>
                </Head>
                <Container fluid>
                    <h3 className="mb-3">Tambah Slider</h3>
                    <Breadcrumb className="my-3">
                        <Link href="/admin" passHref><Breadcrumb.Item >Dashboard</Breadcrumb.Item></Link>
                        <Link href="/admin/slideshow" passHref><Breadcrumb.Item >Slideshow</Breadcrumb.Item></Link>
                        <Breadcrumb.Item active>Tambah</Breadcrumb.Item>
                    </Breadcrumb>

                    <Card className="p-2" body>
                        <Formik
                            initialValues={{
                                text_slide: '',
                                foto: null,
                            }}
                            onSubmit={(values, actions) => {
                                /* alert(JSON.stringify({
                                foto: values.foto})); */
                                API.PostSlideshow({
                                    text_slide: values.text_slide,
                                    foto: values.foto.name
                                }).then(res => {
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
                                        <Form.Label>Judul Slide</Form.Label>
                                        <Form.Control name="text_slide" placeholder="" className="form-control" size="lg" onChange={handleChange} onBlur={handleBlur} value={values.text_slide} isInvalid={!!text_slideError && touched.text_slide} />
                                        {text_slideError && touched.text_slide && <Form.Control.Feedback type="invalid">{text_slideError}</Form.Control.Feedback>}
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="foto">Upload Gambar</Form.Label>
                                        <Form.Control type="file" className="mb-3" name="foto" id="foto" onChange={(event) => {
                                            setFieldValue("foto", event.currentTarget.files[0]);
                                            this.setState({
                                                fotoPreviewUrl: URL.createObjectURL(event.currentTarget.files[0])
                                            })
                                        }
                                        } onBlur={handleBlur} isInvalid={!!errors.foto && touched.foto} />
                                        {errors.foto && touched.foto && <div className="error">{errors.foto}</div>}
                                        {this.state.fotoPreviewUrl ? <img src={this.state.fotoPreviewUrl} width="200" alt="" className="mt-2 img-fluid" /> : ""}
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
                </Container>
            </Layout>
        )
    }
}

export default Create;