import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";

const LoginScreen = () => {
    const [email, setEmail] = useState("");

    const submitHandler = (e) => {
        console.log("Form Submit");
    }
    return (
        <FormContainer>
            <h1>Login</h1>
            <Form>
                {/* <Form.Group controlId="email">
                    <Form.label>Enter Email:</Form.label>
                    <Form.Control type="email"
                        placeholder="Please enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />

                </Form.Group> */}
                <Button type="submit" variant="primary">
                    Login
                </Button>
            </Form>
        </FormContainer>
    )
}

export default LoginScreen
