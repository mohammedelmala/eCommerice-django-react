import React, { useEffect, useState } from 'react';
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { PayPalButton } from "react-paypal-button-v2";

import { Link } from "react-router-dom";


import { getOrderDetails, payOrder, deliverOrder } from "../actions/orderActions";
import { ORDER_DELIVER_RESET } from "../constants/OrdersConstants";

import Loader from "../components/Loader";
import Message from "../components/Message";

const OrderScreen = ({ match }) => {

    const orderId = match.params.id;
    const dispatch = useDispatch();

    const { loading, order, error } = useSelector(state => state.orderDetails);

    const orderPay = useSelector(state => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;

    const orderDeliver = useSelector(state => state.orderDeliver);
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver;


    useEffect(() => {
        if (!order || successPay || order._id !== Number(orderId) || successDeliver) {
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(getOrderDetails(orderId));
        }
        else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript();
            }
            else {
                setSdkReady(true);
            }
        }

    }, [order, orderId, dispatch, successPay, successDeliver]);




    const [sdkReady, setSdkReady] = useState(false);

    const addPayPalScript = () => {
        const clientId = "AaDnkXG4O6cd8K2n0U_JEF2NUYfjnRtD4aM_h2zY1l__OciYdvD6vkOTgBtlBjBNlI5ZvsDhNAC4OfuF";
        const script = document.createElement('script');
        script.type = "text/javascript";
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
        script.async = true;
        script.onload = () => {
            setSdkReady(true);
        }

        document.body.appendChild(script);

    }


    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult));
    }



    if (!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc += (item.qty * item.price), 0).toFixed(2);
        console.log(order.itemsPrice);
    }
    // client id
    // AaDnkXG4O6cd8K2n0U_JEF2NUYfjnRtD4aM_h2zY1l__OciYdvD6vkOTgBtlBjBNlI5ZvsDhNAC4OfuF
    // <script src="https://www.paypal.com/sdk/js?client-id=test"></script>
    {/* <script>paypal.Buttons().render('body');</script> */ }


    const deliverHandler = (e) => {
        dispatch(deliverOrder(order))
    }



    return (
        <div>
            {
                loading ? <Loader /> :
                    error ? <Message variant="danger">{error}</Message> :
                        <Row>
                            <Col md={8}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h2>Shipping</h2>
                                        <p>
                                            <strong>User:</strong> {order.user.name}
                                        </p>
                                        <p>
                                            <strong>Email:</strong> <a href={`mailto: ${order.user.email}`}>${order.user.email}</a>
                                        </p>
                                        <p>
                                            <strong>Address:</strong>
                                            {order.shippingAddress.address},{order.shippingAddress.city}
                                            {` `}
                                            {order.shippingAddress.postalCode}{` `}
                                            {order.shippingAddress.country}
                                        </p>
                                    </ListGroup.Item>
                                </ListGroup>

                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h2>Payment</h2>
                                        <p>
                                            <strong>Payment Methdo:</strong>
                                            {order.paymentMethod}
                                        </p>

                                        {
                                            order.isPaid ?
                                                <Message variant="success">
                                                    Order is Paid at {order.paidAt}
                                                </Message> :
                                                <Message variant="warning">
                                                    Order not paid
                                                </Message>
                                        }


                                        {
                                            order.isDelivered ?
                                                <Message variant="success">
                                                    Delivered at {order.deliveredAt}
                                                </Message> :
                                                <Message variant="warning">
                                                    Order not Delivered
                                            </Message>
                                        }

                                    </ListGroup.Item>
                                </ListGroup>

                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h2>Order Items</h2>
                                        <ListGroup variant="flush">
                                            {
                                                order.orderItems.map((item, index) => (
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
                                                <Col>${order.itemsPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Shipping:</Col>
                                                <Col>${order.shippingPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Tax:</Col>
                                                <Col>${order.taxPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Total:</Col>
                                                <Col>${order.totalPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>

                                        {
                                            !order.isPaid && (

                                                <ListGroup.Item>
                                                    {loadingPay && <Loader />}
                                                    {!sdkReady ? <Loader /> :
                                                        <PayPalButton
                                                            amount={order.totalPrice}
                                                            onSuccess={successPaymentHandler}
                                                        >

                                                        </PayPalButton>
                                                    }
                                                </ListGroup.Item>
                                            )

                                        }

                                        {
                                            !order.isDelivered &&
                                            (
                                                <ListGroup.Item>
                                                    <Button
                                                        type="button"
                                                        className="btn btn-block"
                                                        onClick={deliverHandler}
                                                    >
                                                        Make order Delivered
                                                </Button>
                                                </ListGroup.Item>
                                            )

                                        }



                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
            }
        </div>
    )
}

export default OrderScreen
