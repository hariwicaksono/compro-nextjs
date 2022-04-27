import React, { Component } from 'react';
import {Carousel} from 'react-bootstrap';

class Slideshow extends Component {
    constructor(props){
        super(props)
        this.state={
            url: process.env.NEXT_PUBLIC_API_URL,
            asset: process.env.NEXT_PUBLIC_ASSET_IMG,
        }
    }
    render() {
        const ListSlideshow = this.props.data.map((s, index) => (
            <Carousel.Item key={index} style={{ position: "relative" }} >
                <img
                className="rounded d-block w-100"
                src={this.state.url + this.state.asset + s.img_slide}
                alt={s.txt_slide}
                />
            </Carousel.Item>

        ))
        return (
            <Carousel className="mb-3">
                {ListSlideshow}
            </Carousel>
        )
    }
}

export default Slideshow