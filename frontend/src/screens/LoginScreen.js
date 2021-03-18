import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { userLogin } from "../actions/UserActions";

const LoginScreen = ({ location, history }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState("");
    const dispatch = useDispatch();

    const redirec = history.search ? history.search.split("=")[1] : "/";
    const { loading, userInfo, error } = useSelector(state => state.userLogin);


    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }

    }, [redirect, userInfo])


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(userLogin(email, password));
        console.log("submit button");
    }
    return (
        <FormContainer>
            <h1>Login</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email"
                        placeholder="Please enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />


                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                        placeholder="Please enter your password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                </Form.Group>
                <Button type="submit" variant="primary">
                    Sign In
                </Button>
            </Form>
            <Row className="py-3">
                <Col>
                    You do not have account <Link to="/register">Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
