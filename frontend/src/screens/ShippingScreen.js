import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";

import CheckoutStep from "../components/CheckoutStep";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cartActions";

const ShippingScreen = ({ history }) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submit Shipping Address");
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        history.push('/payment')

    }
    return (
        <FormContainer>
            <h1>Shipping Address</h1>
            <CheckoutStep step1 step2 />
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter address"
                        required
                        value={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter city"
                        required
                        value={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="postalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Postal Code"
                        required
                        value={postalCode ? postalCode : ''}
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Country"
                        required
                        value={country ? country : ''}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </Form.Group>

                <Button type="submit" variant="primary">
                    Continue
                </Button>

            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
