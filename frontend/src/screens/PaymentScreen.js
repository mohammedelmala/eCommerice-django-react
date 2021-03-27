import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Col } from 'react-bootstrap';

import CheckoutStep from "../components/CheckoutStep";
import FormContainer from "../components/FormContainer";


import { savePaymentMethod } from "../actions/cartActions";


const PaymentScreen = ({ history }) => {

    const { shippingAddress } = useSelector(state => state.cart);

    const [paymentMethod, setPaymentMethod] = useState('PayPal');


    const dispatch = useDispatch();

    console.log(shippingAddress);
    useEffect(() => {
        if (!shippingAddress.address) {
            history.push('/shipping');
        }


    }, [history, shippingAddress.address]);


    const submitHandler = (e) => {
        e.preventDefault();
        console.log("submit Form!!!!");
        console.log(paymentMethod);
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder');
    }

    return (



        <div>
            <CheckoutStep step1 step2 step3 />
            <h2> Payment Screen</h2>



            <FormContainer>


                <Form onSubmit={submitHandler}>

                    <Form.Group>
                        <Form.Label as="legend">
                            Select Method
                       </Form.Label>

                        <Col>

                            <Form.Check
                                type="radio"
                                id="paypal"
                                label="Paybal or Creditcard"
                                name="paymentMethod"
                                checked
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />


                        </Col>


                    </Form.Group>
                    <Button type="submit" variant="primary">
                        Continue
                </Button>
                </Form>
            </FormContainer>
        </div>
    )
}

export default PaymentScreen
