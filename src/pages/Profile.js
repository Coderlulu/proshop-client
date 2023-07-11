import React, { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Message, Loader } from "../components";
import {
    userDetailsAction,
    userUpdateDetailsAction,
} from "../redux/action/userAction.js";
import { getMyOrdersAction } from "../redux/action/orderAction.js";
const Profile = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userDetailsAction());
        dispatch(getMyOrdersAction());
    }, [dispatch]);
    const { loading, userInfo, error } = useSelector(
        state => state.userDetails
    );
    const {
        orders,
        loading: loadingOrders,
        error: errorOrders,
    } = useSelector(state => state.myOrderList);
    const [name, setName] = useState("" || userInfo?.name);
    const [email, setEmail] = useState("" || userInfo?.email);
    const [password, setPassword] = useState("" || userInfo?.password);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const submitHandler = e => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            setMessage("Please confirm password again");
        }
        const inputs = { name, email, password };
        dispatch(userUpdateDetailsAction(inputs));
    };
    return (
        <Row>
            <Col md={4}>
                <h2 className="form-title">User Profile</h2>
                {message && <Message variant="danger">{message}</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label className="form-label">Name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label className="form-label">
                                Email
                            </Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label className="form-label">
                                Password
                            </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="confirmPassword">
                            <Form.Label className="form-label">
                                confirmPassword
                            </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter Password"
                                value={confirmPassword}
                                onChange={e =>
                                    setConfirmPassword(e.target.value)
                                }
                            ></Form.Control>
                        </Form.Group>
                        <Button
                            type="submit"
                            variant="primary"
                            className="form-btn"
                        >
                            Update Information
                        </Button>
                    </Form>
                )}
            </Col>
            <Col md={6}>
                <h2>My Orders</h2>
                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant="danger">{errorOrders}</Message>
                ) : orders ? (
                    <Table
                        striped
                        bordered
                        hover
                        responsive
                        className="table-sm"
                    >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Details</th>
                            </tr>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>
                                            <LinkContainer
                                                to={`/order/${order._id}`}
                                            >
                                                <Button
                                                    className="btn-sm"
                                                    variant="light"
                                                >
                                                    Details
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </thead>
                    </Table>
                ) : (
                    <></>
                )}
            </Col>
        </Row>
    );
};

export default Profile;
