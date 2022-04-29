import React, { Component } from "react";
import Link from "next/link";
import { Container, Row, Col, Card } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { ImageUrl } from "../lib/urls";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import parse from "html-react-parser";

class PostBlog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url: ImageUrl(),
			offset: 0,
			perPage: 5,
			currentPage: 0,
		};
		this.handlePageClick = this.handlePageClick.bind(this);
	}

	getHandler = () => {
		const slice = this.props.data.slice(
			this.state.offset,
			this.state.offset + this.state.perPage
		);
		const ListPost = slice.map((post, key) => (
			<Row className="mb-5" key={post.id}>
				<Col md={4}>
					<img
						src={this.state.url + post.post_image}
						alt={post.title}
						className="img-fluid"
					/>
				</Col>
				<Col md={8}>
					<p className="text-muted">
						Posted on: {post.created_at} in{" "}
						<Link href={"/tag/" + post.category} passHref>
							{post.category}
						</Link>
					</p>
					<h2 className="mb-3">
						<Link href={"/blog/posts/" + post.slug} passHref>
							{post.title}
						</Link>
					</h2>
					{parse(post.summary, { trim: true })}
				</Col>
			</Row>
		));

		this.setState({
			pageCount: Math.ceil(this.props.data.length / this.state.perPage),

			ListPost,
		});
	};
	handlePageClick = (e) => {
		const selectedPage = e.selected;
		const offset = selectedPage * this.state.perPage;

		this.setState(
			{
				currentPage: selectedPage,
				offset: offset,
			},
			() => {
				this.getHandler();
			}
		);
	};
	componentDidMount = () => {
		this.getHandler();
	};
	render() {
		return (
			<>
				{this.state.ListPost}

				<div>
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
						previousLabel={<FiChevronsLeft />}
						nextLabel={<FiChevronsRight />}
						pageCount={this.state.pageCount}
						marginPagesDisplayed={2}
						pageRangeDisplayed={3}
						onPageChange={this.handlePageClick}
					/>
				</div>
			</>
		);
	}
}

export default PostBlog;
