import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { fetchProductDetails } from "../actions";

import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";


const ProductScreen = ({ match }) => {

    const id = match.params.id;
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchProductDetails(id));
    }, [dispatch, id])

    const { loading, product, error } = useSelector(state => state.selectedProduct);

    if (!product) {
        return null;
    }

    return (
        <>
            <Link to="/" className="btn btn-light" >Back to Home</Link>
            {
                loading ? <Loader /> :
                    error ? <Message variant="danger">{error}</Message> :
                        (
                            <Row>
                                <Col md={6}>
                                    <Image src={product.image} alt={product.name} fluid />
                                </Col>
                                <Col md={3}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h3>{product.name}</h3>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Rating value={product.rating} numOfReviews={product.numReviews} />
                                        </ListGroup.Item>
                                        <ListGroup.Item >
                                            Price:<strong className="p-2">${product.price}</strong>
                                        </ListGroup.Item>
                                        <ListGroup.Item >
                                            Description:{product.description}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col md={3}>
                                    <Card>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Price</Col>
                                                    <Col>${product.price}</Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Status:</Col>
                                                    <Col>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Button className="btn-block" type="button" disabled={product.countInStock === 0}>
                                                    Add To Cart
                                </Button>
                                            </ListGroup.Item>



                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>
                        )
            }
        </>
    )
}

export default ProductScreen;