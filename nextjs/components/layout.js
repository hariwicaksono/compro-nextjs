import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from './navbar';
import NavbarAdmin from './navbar-admin';
import Sidebar from './sidebar';
import Footer from './footer';
import { Container } from 'react-bootstrap';
import { isLogin, isAdmin } from '../lib/utils';
import API from '../lib/axios';

export const siteName = process.env.NEXT_PUBLIC_SITENAME;
export const siteTitle = process.env.NEXT_PUBLIC_SITETITLE;

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMenu: true,
      login: false,
      Pengaturan: []
    }
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu = function () {
    this.setState({ showMenu: !this.state.showMenu });
  }

  componentDidMount = () => {
    if (localStorage.getItem('isAdmin')) {
      //console.log('ADMIN')
      this.setState({
        login: true
      })
    } else if (localStorage.getItem('isLogin')) {
      //console.log('USER')
      this.setState({
        login: true
      })
    } else {
      this.setState({
        login: false
      })
    }

    API.GetSetting().then(res => {
      this.setState({
        Pengaturan: res.data
      })
    })
  }

  render() {
    const { children, home, login, admin, member } = this.props;

    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="description" content={siteTitle} />
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        </Head>

        {admin ?
          <NavbarAdmin toggleMenu={this.toggleMenu} setting={this.state.Pengaturan} />
          :
          <Navbar toggleMenu={this.toggleMenu} setting={this.state.Pengaturan} />
        }

        <div className="wrapper">
          {this.state.login == true && (
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
            : admin ?
              <div id="content" className="px-3 py-4">
                {children}
              </div>
            :
              <div id="content">
                {children}
              </div>
          }
        </div>

        <Footer setting={this.state.Pengaturan} />
      </>
    );
  }
}
export default Layout;
