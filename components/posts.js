import React, { Component } from 'react';
import Link from 'next/link';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { ImagesUrl } from '../libs/urls';
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import parse from 'html-react-parser';

class Posts extends Component {
  
    constructor(props){
        super(props)
        this.state={
            url : ImagesUrl(),
            offset: 0,
            perPage: 8,
            currentPage: 0
        }
        this.handlePageClick = this.handlePageClick.bind(this);
    } 

   
    getHandler = () => {
       
                const slice = this.props.data.slice(this.state.offset, this.state.offset + this.state.perPage)
                const ListPost = slice.map((post, key) => (
                <Row className="mb-3" key={post.id}>
                    <Col md={4}>
                    <img src={this.state.url+post.post_image} alt={post.title} className="img-fluid" />
                    </Col>
                <Col md={6} >
                <small className="text-muted">Posted on: {post.created_at} in <Link href={"/tag/"+post.category} passHref>{post.category}</Link></small>
                <h3 className="mb-2"><Link href={"/blog/posts/"+post.id} passHref>{post.title}</Link></h3>
                {parse(post.summary, { trim: true })}
                </Col>
                </Row>
                ))

                this.setState({
                    pageCount: Math.ceil(this.props.data.length / this.state.perPage),
                   
                    ListPost
                })

    
    }
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.getHandler()
        });

    };
    componentDidMount = () => {
        this.getHandler()
  }
    render() {
        return (
            <>
           
            {this.state.ListPost}
  
            <div className="py-3">
                <ReactPaginate
                containerClassName="pagination"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageClassName="page-item"
                previousClassName="page-item"
                nextClassName="page-item"
                pageLinkClassName="page-link"
                previousLinkClassName="page-link"
                nextLinkClassName="page-link"
                activeClassName="active"
                previousLabel={<FiChevronsLeft/>}
                nextLabel={<FiChevronsRight/>}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={this.handlePageClick}
                />
            </div>
            </>
        )
    }
}

export default Posts