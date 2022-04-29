import React, { Component } from "react";
import Link from "next/link";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { ImageUrl } from "../lib/urls";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import parse from "html-react-parser";
import { FaWhatsapp } from "react-icons/fa";

class PostServices extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url: ImageUrl(),
			offset: 0,
			perPage: 4,
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
			<Col md={6}>
				<Card className="mb-5" key={post.id}>
					<Card.Img variant="top" src={this.state.url + post.image}
						alt={post.title}
						className="img-fluid" />
					<Card.Body>
						<Card.Title className="mb-4">
							<h3>
								<Link href={"/services/" + post.slug} passHref>
									{post.title}
								</Link>
							</h3>
						</Card.Title>
							<Link href={'https://wa.me/' + this.props.setting.phone + '?text=Saya%20ingin%20tanya%20Layanan%20' + encodeURIComponent(post.title)} passHref>
							<a target="_blank" rel="noopener noreferrer">
							<div className="d-grid gap-2">
							<Button variant="success"><FaWhatsapp /> Order Sekarang</Button>
							</div>
							</a>
							</Link>
					</Card.Body>
				</Card>
			</Col>
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
				<Row>
					{this.state.ListPost}
				</Row>
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

export default PostServices;
