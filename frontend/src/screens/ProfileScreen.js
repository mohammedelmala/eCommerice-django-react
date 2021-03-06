import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap"
import { Row, Col, Form, Button, Table } from "react-bootstrap";

import { getDetails } from "../actions/UserActions";
import { listMyOrders } from "../actions/orderActions";

import Message from "../components/Message";
import Loader from "../components/Loader";


const ProfileScreen = ({ history }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { loading, user, error } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const orderListMy = useSelector(state => state.orderListMy);
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;






    useEffect(() => {

        if (!userInfo) {
            history.push(`login`)
        }
        else {
            if (!user || !user.name || userInfo.id !== user.id) {
                dispatch(getDetails(`profile`));
                dispatch(listMyOrders());
            }
            else {
                setName(user.name);
                setEmail(user.email);
            }

        }



    }, [dispatch, userInfo, history, user])



    const submitHaandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Password dows not match confirmed password")
        }
        else {
            setMessage('');
            console.log("Update Profile");
        }

    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant="danger">{message}</Message>}

                {loading && <Loader />}

                {error && <Message variant="danger">{error}</Message>}


                <Form onSubmit={submitHaandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text"
                            required
                            placeholder="Please enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email"
                            required
                            placeholder="Please enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                            placeholder="Please enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password"
                            placeholder="Please enter your password confirmation"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary">
                        Update
                    </Button>

                </Form>

            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders ? <Loader /> :
                    errorOrders ? <Message variant="danger">{error}</Message> :
                        <Table striped responsive className="table-sm">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Paid</th>
                                    <th>Delivered</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>${order.totalPrice}</td>
                                        <td>{order.isPaid ? order.paidAt.substring(0, 19) :
                                            <i className="fas fa-times" style={{ color: "red" }}></i>
                                        }
                                        </td>
                                        <td>{order.isDelivered ? order.deliveredAt.substring(0, 19) :
                                            <i className="fas fa-times" style={{ color: "red" }}></i>}
                                        </td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button className="btn-sm">
                                                    Details
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </Table>
                }


            </Col>
        </Row>
    )
}

export default ProfileScreen;
