import React, { Component } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import Layout, { siteName, siteTitle } from '../components/layout';
import { Container, Card, Row, Col, Spinner, Button, Form, FloatingLabel, Modal } from 'react-bootstrap';
import API from '../lib/axios';
import { ImageUrl } from '../lib/urls';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import * as yup from 'yup';
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import styled from 'styled-components';
import parse from 'html-react-parser';

/* const validationSchema = yup.object({
  email: yup.string().email(),
}); */

const Hero = styled.div`
    background-image: url('https://picsum.photos/910/600?random') !important;
    background-position: center;
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
`;

class Contact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            company: '',
            address: '',
            website: '',
            phone: '',
            email: '',
            maps: '',
            loading: true,
        }

    }

    componentDidMount = () => {
        API.GetSetting().then(res => {
            setTimeout(() => this.setState({
                company: res.data.company,
                address: res.data.address,
                website: res.data.website,
                phone: res.data.phone,
                email: res.data.email,
                maps: res.data.maps,
                loading: false,
            }), 100);
        })
    }
    render() {
        return (
            <Layout home>
                <Head>
                    <title>Kontak kami - {siteTitle}</title>
                </Head>

                <Hero>
                    <Container className="col-xxl-8 px-3 py-5">
                        <Row className="g-4 py-4 justify-content-center text-center">
                            <Col md="10">
                                <h1 className="display-5 fw-bold lh-1 mb-3 text-white">Kontak kami</h1>
                            </Col>
                        </Row>
                    </Container>
                </Hero>

                <Container className="py-5">
                    <Row>
                        <Col md="6">
                            <h3 className="mb-4 display-6">Hubungi kami</h3>
                            <h3 className="mb-3">{this.state.company}</h3>
                            <h4>Alamat</h4>
                            <h5 className="mb-3 fw-normal"><FaMapMarkerAlt /> {this.state.address}</h5>
                            <h4>Telepon</h4>
                            <h5 className="mb-3 fw-normal"><FaPhone /> {this.state.phone}</h5>
                            <h4>Email</h4>
                            <h5 className="mb-3 fw-normal"><FaEnvelope /> {this.state.email}</h5>
                        </Col>
                        <Col md="6">
                            <div className="google-maps">
                                {parse(this.state.maps)}
                            </div>
                        </Col>
                    </Row>

                </Container>
            </Layout>
        );
    }
}

export default Contact;
