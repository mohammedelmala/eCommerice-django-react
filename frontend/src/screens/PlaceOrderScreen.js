import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import { ListGroup, Row, Col, Image, Card, Button } from "react-bootstrap";

import CheckoutStep from "../components/CheckoutStep";
import Message from "../components/Message";
import Loader from "../components/Loader";


import { createOrder, resetOrder } from "../actions/orderActions";

const PlaceOrderScreen = ({ history }) => {
    const { success, order, error } = useSelector(state => state.createOrder);

    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    cart.totalItems = cart.cartItems.reduce((acc, item) => acc = acc + item.qty * item.price, 0).toFixed(2);
    cart.shippingPrice = (cart.totalItems >= 100 ? 0 : 10).toFixed(2);
    cart.taxPrice = (Number(cart.totalItems) * 0.1).toFixed(2);
    cart.totalPrice = (Number(cart.totalItems) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);


    useEffect(() => {
        if (success) {
            history.push(`order/${order._id}`);
            dispatch(resetOrder());
        }

    }, [success, history, dispatch]);


    const placeOrder = (e) => {

        e.preventDefault();
        console.log("Place Order...");
        dispatch(createOrder({
            paymentMethod: cart.paymentMethod,
            taxPrice: cart.taxPrice,
            shippingPrice: cart.shippingPrice,
            totalPrice: cart.totalPrice,
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress
        }
        ));
    }

    if (!cart.paymentMethod) {
        history.push('/payment');

    }



    return (
        <div>
            <CheckoutStep step1 step2 step3 step4 />
            <h2>Place Order Screen</h2>
            <Row>
                <Col md={8}>

                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address:</strong>
                                {cart.shippingAddress.address},{cart.shippingAddress.city}
                                {` `}
                                {cart.shippingAddress.postalCode}{` `}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Payment</h2>
                            <p>
                                <strong>Payment Methdo:</strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            <ListGroup variant="flush">
                                {
                                    cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/products/${item.product}`}>{item.name} </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>${cart.totalItems}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            {error && (
                                <ListGroup.Item>
                                    <Message variant="danger">
                                        {error}
                                    </Message>
                                </ListGroup.Item>
                            )}

                            <ListGroup.Item>
                                <Button type="button"
                                    className="btn-block"
                                    disabled={cart.totalPrice === 0}
                                    onClick={placeOrder}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div >
    )
}

export default PlaceOrderScreen
