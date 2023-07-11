import React, { useState, useEffect } from "react";
import { FormContainer, Loader, Message } from "../components";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, secondsLaterNavigate } from "../utils";
import { authAction } from "../redux/action/userAction.js";
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, userInfo, loading } = useSelector(state => state.auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const submitHandler = e => {
        e.preventDefault();
        if (!email || !password) {
            setMessage("Please enter all values");
            clearMessage(setMessage);
        } else {
            // dispatch auth action
            dispatch(authAction({ email, password }, "login"));
        }
    };
    useEffect(() => {
        if (userInfo) {
            setMessage("Logged In successfully");
            secondsLaterNavigate(navigate, "/");
        }
    }, [navigate, userInfo]);
    return (
        <>
            <FormContainer>
                <h1 className="form-title">Login</h1>
                {message && <Message variant="info">{message}</Message>}
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    {/* email */}
                    <Form.Group controlId="email">
                        <Form.Label className="form-label">Email</Form.Label>
                        <Form.Control
                            className="form-input"
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    {/* Password */}
                    <Form.Group controlId="password">
                        <Form.Label className="form-label">Password</Form.Label>
                        <Form.Control
                            className="form-input"
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button
                        className="form-btn"
                        type="submit"
                        variant="primary"
                    >
                        Login
                    </Button>
                </Form>
                <Row className="form-link">
                    <Col>
                        Don't have an account ?
                        <Link to="/register">Register</Link>
                    </Col>
                </Row>
            </FormContainer>
        </>
    );
};

export default Login;
