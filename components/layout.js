import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from './navbar';
import Sidebar from './sidebar';
import { Container } from 'react-bootstrap';

export const siteName = 'Starter App'
export const siteTitle = 'Starter App Next.js'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
        showMenu: true
    }
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu = function() {
    this.setState({ showMenu: !this.state.showMenu });
  }
  render() {
    const { children, home, login, admin, member } = this.props;

  return (
    <>
    <Head>  
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <link href="https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600" rel="stylesheet" />
    <meta name="description" content="" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    </Head>

    <Navbar toggleMenu={this.toggleMenu} />
    <div className="wrapper">
    {admin && (
        <Sidebar showMenu={this.state.showMenu} />
    )} 
    {!home && !login && !admin ? 
    <div id="content">
      <Container>
    <div className="pt-3">
    <Link href="/" passHref>
            <a>← Kembali</a>
          </Link>
    </div> 
    </Container>
      {children}
    </div>
    :
    <div id="content">
      {children}
    </div>
    }
    </div>
    </>
  );
  }
}
export default Layout;
