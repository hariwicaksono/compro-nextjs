import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const Section = styled.div`
    background-color: #000;
    color: #fff;
`;

class Footer extends Component {
    render() {

        return (
            <Section className="py-4">
                <Container>
                    <Row>
                        <Col md={8}>
                           
                        </Col>
                        <Col md={4}>
                           
                        </Col>
                    </Row>
                    <div className="mt-3">© {(new Date().getFullYear())} {this.props.setting.company}. Aplikasi Web dengan React Next.js dan CodeIgniter 3</div>
                </Container>
            </Section>
        )
    }
}

export default Footer