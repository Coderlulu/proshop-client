import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { Product, Message, Loader, Meta } from "../components";
import { productListAction } from "../redux/action/productAction.js";
const Home = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const keyword = location.pathname.split("/")[2];
    const { loading, error, products } = useSelector(
        state => state.productList
    );
    useEffect(() => {
        dispatch(productListAction());
    }, [dispatch]);
    return (
        <>
            <Meta />
            {!keyword ? (
                // <ProductCarousel />
                <></>
            ) : (
                <Link to="/" className="btn btn-light">
                    Go Back
                </Link>
            )}
            <h1 className="form-title">Latest Products</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <Row>
                        {products &&
                            products.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4}>
                                    <Product product={product} />
                                </Col>
                            ))}
                    </Row>
                </>
            )}
        </>
    );
};

export default Home;
