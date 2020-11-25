import React, {Component} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {Container, Navbar, Nav, NavItem, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import API from '../libs/axios';
import {logout, isLogin, isAdmin} from '../libs/utils';
import {ImagesUrl} from '../libs/urls';
import SearchForm from './searchForm';
import {FaBars} from 'react-icons/fa';

class MyNavbar extends Component{
  constructor(props) {
    super(props)
    this.state = {
        login:false,
        id: '',
        name: '',
        foto:'',
        user: false,
        admin: false,
        url: ImagesUrl()
    }
  }
  Logout = () => {
    logout();
}
componentDidMount = () => {
  if (isLogin()) {
      const data = JSON.parse(localStorage.getItem('isLogin'))
      const id = data[0].email
      API.GetUserId(id).then(res=>{
          this.setState({
              id : res.data[0].id,
              name: res.data[0].name,
              user: true
          })
      })
          
  } else if (isAdmin()) {
       const data = JSON.parse(localStorage.getItem('isAdmin'))
       const id = data[0].email
       API.GetUserId(id).then(res=>{
           this.setState({
               id : res.data[0].id,
               name: res.data[0].name,
               admin: true
           })
       })
           
   }
  else {
      this.setState({
          login:true
      })
  }
  API.GetSetting().then(res=>{
    this.setState({
        id : res.data[0].id,
        company: res.data[0].company
    })
})
  }
  render(){
        
    return(
     
<Navbar bg="dark" variant="dark" className="shadow border-bottom" expand="lg" sticky="top">
<Container>
  <Link href="/" passHref><Navbar.Brand>{this.state.company}</Navbar.Brand></Link>
  {this.state.admin && (
    <Button onClick={this.props.toggleMenu} type="button" className="btn btn-primary text-white btn-sm">
      <FaBars />
    </Button>
  )}
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    <Link href="/" passHref><Nav.Link>Home</Nav.Link></Link>
      <Link href="/blog" passHref><Nav.Link>Blog</Nav.Link></Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <SearchForm/>
    <Nav>
    {this.state.login ?
                <>
                <Form inline className="my-2 my-lg-0 pl-1">
                <Link href="/login" passHref>
                <Button variant="info" activeClassName="active">Masuk</Button>
                </Link>
                </Form>
                </>
               :
               <>
               <NavItem>
               <NavDropdown title=
               {this.state.foto ? (
                <>
                <img
                    alt="Foto"
                    width="30"
                    className="rounded-circle"
                    src={this.state.url+this.state.foto} />
                </>
                    ) : (
                <>
                <img
                    alt="Foto"
                    width="30"
                    className="rounded-circle"
                    src={this.state.url+'no-avatar.png'} />
                </>
                )} id="basic-nav-dropdown" alignRight>
                <NavDropdown.Item>{this.state.name}</NavDropdown.Item>
                <NavDropdown.Item>Ganti Password</NavDropdown.Item>
                <NavDropdown.Item onClick={this.Logout} href=''>Keluar</NavDropdown.Item>
                </NavDropdown>
                </NavItem>
                </>
                }
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
     
    );
  }
}

export default MyNavbar;