import React, { Component } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import { Container, Navbar, Nav, NavItem, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import API from '../lib/axios';
import { logout, isLogin, isAdmin } from '../lib/utils';
import { ImagesUrl } from '../lib/urls';
import FormSearch from './form-search';
import { FaBars, FaSignInAlt, FaSignOutAlt, FaKey } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

class NavbarHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentDidMount = () => {
    if (localStorage.getItem('isAdmin')) {
      return (Router.push('/admin'))
    }
    if (isLogin()) {
      const data = JSON.parse(localStorage.getItem('isLogin'))
      const id = data.email
      API.GetUserId(id).then(res => {
        this.setState({
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
          loading: false,
        })
      })

    }
    else {
      setTimeout(() => this.setState({
        loading: false
      }), 100);
    }

  }

  render() {

    return (
      <Navbar bg="light" className="shadow-sm border-bottom py-4" expand="lg" sticky="top">
        <Container>

          <Link href="/" passHref><Navbar.Brand>
            {this.state.loading ?
              <>
                <Skeleton width={180} height={25} />
              </>
              :
              <>
                {this.props.setting.company}
              </>
            }</Navbar.Brand></Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref><Nav.Link>Home</Nav.Link></Link>
              <Link href="/blog" passHref><Nav.Link>Blog</Nav.Link></Link>
              <Link href="/services" passHref><Nav.Link>Layanan</Nav.Link></Link>
              <Link href="/contact" passHref><Nav.Link>Kontak</Nav.Link></Link>
            </Nav>

            <FormSearch />

            <Form inline="true">
              <Link href="/login" passHref>
                <Button variant="outline-primary"><FaSignInAlt /> Login</Button>
              </Link>
            </Form>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default NavbarHome;