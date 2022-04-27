import React, { Component } from 'react';
import Link from 'next/link';
import API from '../libs/axios';
//import { NotificationManager } from 'react-notifications'
import { Form, Button, Spinner, Modal } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
//import Form from 'react-formal'
//import * as yup from 'yup'

//const schema = yup.object({
    //query: yup.string().required(),
  //}); 

class SearchForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
            results: [],
            loading: false,
            show: false,
        }
        this.handlerChange = this.handlerChange.bind(this)
        this.handlerSubmit = this.handlerSubmit.bind(this)
        
    }

    handlerChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handlerSubmit = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const query=this.state.query;
        API.SearchBlog(query).then(res=>{
            //console.log(res)
            setTimeout(() => this.setState({
              results: res.data,
              loading: false,
              show: true,
            }), 100);
        });  
    }

    handlerClose = () => {
        this.setState({
            show: false,
        })
    }
    
    render() {
        const SearchResults = this.state.results.map(r => (
            <div className="text-dark" key={r.id}>
              <h6><Link href={"/blog/posts/"+r.id} passHref><a alt="">{r.title}</a></Link></h6>
            </div>
             
            ))
        return (
           
                <Form className="d-flex me-3" onSubmit={this.handlerSubmit}>
                <div className="input-group">
                    <Form.Control className="border" type="text" name="query" placeholder="Search..." onChange={this.handlerChange} required/>
                    <span className="input-group-append">
                    <Button className="border text-secondary" type="submit" variant="light">
                    {
                        this.state.loading
                        ?
                        <><Spinner as="span" animation="grow" size="sm"  role="status" aria-hidden="true" /></>
                        :   
                    <><FaSearch size="1.2em" /></>}
                    </Button>
                </span>

                </div>

                {this.state.results.length > 0 && (
               <>
               <Modal show={this.state.show} onHide={this.handlerClose}>
                 <Modal.Header closeButton>
                   <Modal.Title>Hasil Pencarian</Modal.Title>
                 </Modal.Header>
                 <Modal.Body>
                    {SearchResults}
                 </Modal.Body>
                 <Modal.Footer>
                   <Button variant="secondary" onClick={this.handlerClose}>
                     Tutup
                   </Button>
                 </Modal.Footer>
               </Modal>
             </>
            
               )}

               
                </Form>   
        )
    }

}

export default SearchForm;