import React,{useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import { Form, Button, Col } from 'react-bootstrap';

import CheckoutStep from "../components/CheckoutStep";
import FormContainer from "../components/FormContainer";


import {savePaymentMethod} from "../actions/cartActions";


const PaymentScreen = ({history}) => {
   
   const {shippingAddress} = useSelector(state => state.cart);
   
   const [paymentMethod, setPaymentMethod] = useState('PayPal');
   

   const dispatch = useDispatch();

    console.log(shippingAddress);
   useEffect(() =>{
       if(!shippingAddress.address){
           history.push('/shipping');
       }

   } ,[]);


   const submitHandler = (e) =>{
       e.preventDefault(); 
       console.log("submit Form!!!!"); 
       console.log(paymentMethod);
       dispatch(savePaymentMethod({paymentMethod}));
   }

    return (
       


        <div>
            Payment Screen
            
            

            <FormContainer>
               <CheckoutStep step1 step2 step3 /> 

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
                                onChange={(e)=>setPaymentMethod(e.target.value)}
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
