import React, { Component } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import { Container, Navbar, Nav, NavItem, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import API from '../libs/axios';
import { logout, isLogin, isAdmin } from '../libs/utils';
import { ImageUrl } from '../libs/urls';
import SearchForm from './searchForm';
import { FaBars, FaSignInAlt, FaSignOutAlt, FaKey } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';

class NavbarA extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: false,
      id: '',
      name: '',
      foto: '',
      user: false,
      admin: false,
      url: ImageUrl(),
      loading: true
    }
  }

  Logout = () => {
    logout();
  }

  componentDidMount = () => {
    if (!isAdmin()) {
      return (Router.push('/login'))
    }
    if (isAdmin()) {
      const data = JSON.parse(localStorage.getItem('isAdmin'))
      const id = data.email
      API.GetUserId(id).then(res => {
        console.log(res)
        if (res.status == true) {
          this.setState({
            id: res.data.id,
            name: res.data.name,
            email: res.data.email,
            loading: false,
            admin: true
          })
        } else {
          toast.warn(res.message, { position: "top-center" });
        }  
      })
    } else {
      setTimeout(() => this.setState({
        login: true,
        loading: false
      }), 100);
    }
  }

  render() {

    return (

      <Navbar bg="light" className="shadow-sm border-bottom py-3" expand="lg" sticky="top">
        <Container fluid>
          {this.state.admin && (
            <Button variant="outline-dark" onClick={this.props.toggleMenu} type="button" className="me-3">
              <FaBars />
            </Button>
          )}
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

            <SearchForm />

            {this.state.login ?
              <>
                <Form inline>
                  <Link href="/login" passHref>
                    <Button className="text-light" variant="link"><FaSignInAlt /> Login</Button>
                  </Link>
                </Form>

              </>
              :
              <>
                <Nav>
                  <NavItem>
                    <NavDropdown title=
                      {this.state.foto ? (
                        <>
                          <img
                            alt="Foto"
                            width="30"
                            className="rounded-circle"
                            src={this.state.url + this.state.foto} /> {this.state.name}
                        </>
                      ) : (
                        <>
                          <img
                            alt="Foto"
                            width="30"
                            className="rounded-circle"
                            src={this.state.url + 'no-avatar.png'} />  {this.state.name}
                        </>
                      )} id="basic-nav-dropdown" align="end">
                      <NavDropdown.Item>{this.state.email}</NavDropdown.Item>
                      <Link href="/admin/password" passHref><NavDropdown.Item><FaKey /> Ganti Password</NavDropdown.Item></Link>
                      <NavDropdown.Item onClick={this.Logout} href=''><FaSignOutAlt /> Logout</NavDropdown.Item>
                    </NavDropdown>
                  </NavItem>
                </Nav>
              </>
            }

          </Navbar.Collapse>
        </Container>
      </Navbar>

    );
  }
}

export default NavbarA;