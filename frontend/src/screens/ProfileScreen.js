import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Form, Button } from "react-bootstrap";

import { getDetails } from "../actions/UserActions";

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


    useEffect(() => {
        if (!userInfo) {
            history.push(`login`)
        }
        else {
            if (!user || !user.name) {
                dispatch(getDetails(`profile`));
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
            </Col>
        </Row>
    )
}

export default ProfileScreen;
