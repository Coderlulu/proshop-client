import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FormContainer, CheckoutSteps } from "../components";
import { savePaymentMethodAction } from "../redux/action/cartAction.js";
import { useNavigate } from "react-router-dom";
const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState("PayPal");
    const { shippingAddress } = useSelector(state => state.cart);
    const navigate = useNavigate();
    if (!shippingAddress) {
        navigate("/");
    }
    const dispatch = useDispatch();
    const submitHandler = e => {
        e.preventDefault();
        dispatch(savePaymentMethodAction(paymentMethod));
        navigate("/placeorder");
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type="radio"
                            label="PayPal or Credit Card"
                            id="PayPal"
                            name="paymentMethod"
                            value="PayPal"
                            checked
                            onChange={e => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>

                <Button type="submit" variant="primary" className="form-btn">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};

export default Payment;
