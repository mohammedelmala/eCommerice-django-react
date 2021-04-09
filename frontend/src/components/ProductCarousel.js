import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Carousel, Image } from "react-bootstrap";

import { Link } from "react-router-dom";

import { listTopProducts } from "../actions/ProductActions";

import Loader from "./Loader";
import Message from "./Message";

const ProductCarousel = () => {

    const dispatch = useDispatch();
    const productTopRated = useSelector(state => state.productTopRated);
    const { loading, products, error } = productTopRated;

    useEffect(() => {
        dispatch(listTopProducts());
    }, [dispatch])

    return (
        loading ? <Loader /> :
            error ? <Message variant="danger">{error}</Message> :
                <Carousel pause="hover" className="bg-dark">
                    {
                        products.map(product => (
                            <Carousel.Item key={product._id}>
                                <Link to={`/products/${product._id}`}>
                                    <Image src={product.image} alt={product.name} fluid />
                                    <Carousel.Caption className="carosel.caption">
                                        <h4>{product.name} (${product.price})</h4>
                                    </Carousel.Caption>
                                </Link>
                            </Carousel.Item>
                        ))
                    }
                </Carousel >
    )
}

export default ProductCarousel;
