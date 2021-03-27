import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Row, Col, ListGroup, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../components/Message";

import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = ({ match, location, history }) => {



    const productId = match.params.id;
    const qty = location.search ? location.search.split("=")[1] : 1;


    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const removeFromCartHandler = (id) => {
        console.log(`remove from cart item ${id}`);
        dispatch(removeFromCart(id));
    }

    const checkoutHandler = () => {
        console.log("Checkout Handler");
        history.push("/login?redirect=shipping")
    }

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
                                                    <Form.Control as="select"
                                                        value={item.qty}
                                                        onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                                                        {
                                                            [...Array(item.countInStock > 0 ? item.countInStock : 0).keys()].map(x => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))
                                                        }
                                                    </Form.Control>
                                                </Col>
                                                <Col md={1}>
                                                    <Button variant="light" onClick={() => removeFromCartHandler(item.product)}>
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
                    <Card className="flush">
                        <ListGroup>
                            <ListGroup.Item>
                                <h4>Total :  {cartItems.reduce((total, item) => total + parseInt(item.qty), 0)}</h4>
                                <h4>Amount: ${cartItems.reduce((total, item) => total + Number(item.qty * item.price), 0)}</h4>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button className="btn-block" type="button" disabled={cartItems.length === 0} onClick={checkoutHandler}>
                                    Processd To Checkout
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div >
    )
}

export default CartScreen;
