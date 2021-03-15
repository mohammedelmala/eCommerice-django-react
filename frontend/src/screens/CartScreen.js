import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, ListGroup, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../components/Message";

import { addToCart } from "../actions/cartActions";

const CartScreen = ({ match, location, history }) => {

    const productId = match.params.id;
    const qty = location.search ? location.search.split("=")[1] : 1;


    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    console.log(cart);

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }

    }, [dispatch, productId, qty])

    return (
        <div>
            <Row>
                <Col md={8}>
                    <h1>Cart Items</h1>
                    {
                        cartItems.length === 0 ? (
                            <Message variant="info">
                                Your cart is Empty <Link to="/">Go Back</Link>
                            </Message>
                        ) :
                            (
                                <ListGroup variant="flush">
                                    {cartItems.map((item) => (
                                        <ListGroup.Item key={item.product}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} fluid rounded />
                                                </Col>

                                                <Col md={3}>
                                                    {item.name}
                                                </Col>

                                                <Col md={2}>
                                                    ${item.price}
                                                </Col>
                                                <Col md={3}>
                                                    <Form.Control as="select" value={item.qty}>
                                                        {
                                                            [...Array(item.countInStock).keys()].map(x => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))
                                                        }
                                                    </Form.Control>
                                                </Col>
                                                <Col md={1}>
                                                    <Button variant="light">
                                                        <i className="fas fa-trash" ></i>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )
                    }
                </Col>
                <Col md={4}>
                </Col>
            </Row>
        </div>
    )
}

export default CartScreen;
