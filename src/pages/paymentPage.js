import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import FormContainer from "../components/formContainer";
import CheckoutStep from "../components/checkoutStep";
import {Button, Card, Form, Image, ListGroup} from "react-bootstrap";
import {Row, Col} from 'react-bootstrap';
import {savePaymentMethod} from "../actions/cartActions";


function PaymentPage() {


    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [paymentMethod, setPaymentMethod] = useState('Paypal')

    if(!shippingAddress.address) {
        navigate('/shipping')
    }

    const submitHandler = (e) => {
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeOrder')
    }

    return (
        <FormContainer>
            <CheckoutStep step1 step2 step3/>

            <Form onSubmit={submitHandler}>

                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='Paypal or Credit Card'
                            id='paypal'
                            name='paymentMethod'
                            checked
                            onChange={(e)=>setPaymentMethod(e.target.value)}
                        >

                        </Form.Check>
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
}

export default PaymentPage;