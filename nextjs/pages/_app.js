import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import 'spin.js/spin.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import API from '../lib/axios';
import SSRProvider from 'react-bootstrap/SSRProvider';

class MyApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Pengaturan: []
    }
  }

  componentDidMount = () => {
    API.GetSetting().then(res => {
      this.setState({
        Pengaturan: res.data[0]
      })
    })
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <SSRProvider>
          <Component {...pageProps} setting={this.state.Pengaturan} />
        </SSRProvider>
        <ToastContainer position="top-center" hideProgressBar={true} autoClose={3000}/>
      </>
    );
  }
}

export default MyApp;
