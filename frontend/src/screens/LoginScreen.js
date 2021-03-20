import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { userLogin } from "../actions/UserActions";

import Message from "../components/Message";
import Loader from "../components/Loader"

const LoginScreen = ({ location, history }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const redirect = location.search ? location.search.split("=")[1] : "/";

    const { loading, userInfo, error } = useSelector(state => state.userLogin);

    useEffect(() => {
        if (userInfo) {
            history.push(`/${redirect}`);
        }

    }, [redirect, userInfo, userInfo]);



    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(userLogin(email, password));
        console.log("submit button");
    }
    return (
        <FormContainer>
            <h1>Login</h1>
            {
                loading ? <Loader></Loader> :
                    (
                        <div>
                            <Form onSubmit={submitHandler} className="py-3">
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
                                        onChange={e => setPassword(e.target.value)}
                                    />

                                </Form.Group>
                                <Button type="submit" variant="primary">
                                    Sign In
                </Button>
                            </Form>

                            {error ?
                                <Message variant="danger" >
                                    <h3>{error} </h3>
                                </Message> : ""}
                            <Row className="py-3">
                                <Col>
                                    You do not have account <Link to="/register">Register</Link>
                                </Col>
                            </Row>
                        </div>

                    )
            }
        </FormContainer>
    )
}

export default LoginScreen
