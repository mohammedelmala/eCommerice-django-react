import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

import { register, userLogin } from "../actions/UserActions";
import { Redirect } from 'react-router';

const RegisterScreen = (location, history) => {
    const redirect = location.search ? location.search.splice("=")[1] : '/login';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const { loading, error } = useSelector(state => state.userRegister);

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Password does not match");
        }
        else {
            dispatch(register(name, email, password));
            dispatch(userLogin(name, password));
        }

    }

    return (

        <FormContainer>
            {message && <Message variant="danger">{message}</Message>}

            { loading && <Loader />}

            { error && <Message variant="danger">{error}</Message>}

            <Form onSubmit={onSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text"
                        placeholder="Please enter your name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />


                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email"
                        placeholder="Please enter your email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                        placeholder="Please enter your password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password"
                        placeholder="Please confirm your password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit">
                    Submit
                </Button>
            </Form>

            <Row className="py-3">
                <Col>
                    You have account return to <Link to={Redirect ? `/login?${redirect}` : '/login'}>Login</Link>
                </Col>
            </Row>


        </FormContainer>
    )
}

export default RegisterScreen
