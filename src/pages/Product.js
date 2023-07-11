import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { productDetailsAction } from "../redux/action/productAction.js";
import { Loader, Message, Meta, Rating } from "../components";
import {
    Row,
    Col,
    Image,
    ListGroup,
    Card,
    Form,
    Button,
} from "react-bootstrap";
const Product = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    console.log(id);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(productDetailsAction(id));
    }, [dispatch, id]);
    const [qty, setQty] = useState(1);
    const navigate = useNavigate();
    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    const addToCartHandler = e => {
        e.preventDefault();
        navigate(`/cart/${id}?qty=${qty}`);
    };
    return (
        <>
            <Link className="btn btn-light my-3" to="/">
                Go Back
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : product ? (
                <>
                    <>
                        <Meta title={product?.name} />
                        <Row>
                            <Col md={6}>
                                <Image
                                    src={product?.image[0].url}
                                    alt={product?.name}
                                    className="rounded"
                                />
                            </Col>
                            <Col md={3}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h3>{product?.name}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating
                                            value={product?.rating}
                                            text={`${product?.numReviews} reviews`}
                                        />
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Price: ${product?.price}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Description: {product?.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Price:</Col>
                                                <Col>
                                                    <strong>
                                                        $ {product?.price}
                                                    </strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Status:</Col>
                                                <Col>
                                                    {product?.countInStock > 0
                                                        ? "In Stock"
                                                        : "Out Of Stock"}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        {product?.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Qty</Col>
                                                    <Col>
                                                        <Form.Control
                                                            as="select"
                                                            value={qty}
                                                            onChange={e =>
                                                                setQty(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        >
                                                            {[
                                                                ...Array(
                                                                    product?.countInStock
                                                                ).keys(),
                                                            ].map(number => (
                                                                <option
                                                                    key={
                                                                        number +
                                                                        1
                                                                    }
                                                                    value={
                                                                        number +
                                                                        1
                                                                    }
                                                                >
                                                                    {number + 1}
                                                                </option>
                                                            ))}
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}
                                        <ListGroup.Item>
                                            <Button
                                                onClick={addToCartHandler}
                                                className="btn-block"
                                                type="button"
                                                disabled={
                                                    product.countInStock === 0
                                                }
                                            >
                                                Add To Cart
                                            </Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                        {/* Second Row */}
                        <Row className="my-3">
                            <Col md={12}>
                                <h2>Reviews</h2>
                                {product?.numReviews === 0 ? (
                                    <Message>No Reviews</Message>
                                ) : (
                                    product?.reviews.map(review => (
                                        <ListGroup.Item key={review._id}>
                                            <strong>{review.name}</strong>
                                            <Rating value={review.rating} />
                                            <p>
                                                {review.createdAt.substring(
                                                    0,
                                                    10
                                                )}
                                            </p>
                                            <p>{review.comment}</p>
                                        </ListGroup.Item>
                                    ))
                                )}
                            </Col>
                        </Row>
                    </>
                </>
            ) : (
                <></>
            )}
        </>
    );
};

export default Product;
