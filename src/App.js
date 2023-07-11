import React from "react";
import {
    Register,
    Cart,
    Home,
    Login,
    Order,
    OrderList,
    Payment,
    PlaceOrder,
    Product,
    ProductList,
    ProductEdit,
    Profile,
    Shipping,
    UserEdit,
    UserList,
} from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components";
import { Container } from "react-bootstrap";

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <main className="py-3">
                <Container>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/search/:keyword" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/payment" element={<Payment />} />
                        <Route path="/placeorder" element={<PlaceOrder />} />
                        <Route path="/shipping" element={<Shipping />} />
                        <Route path="/order/:id" element={<Order />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="/product/:id" element={<Product />} />
                        <Route path="/cart/:id?" element={<Cart />} />
                        <Route path="/admin/userlist" element={<UserList />} />
                        <Route
                            path="/admin/user/:id/edit"
                            element={<UserEdit />}
                        />
                        <Route
                            path="/admin/productList"
                            element={<ProductList />}
                        />
                        <Route
                            path="/admin/product/:id/edit"
                            element={ProductEdit}
                        />
                        <Route path="/admin/orderlist" element={OrderList} />
                    </Routes>
                </Container>
            </main>
            <Footer />
        </BrowserRouter>
    );
};

export default App;
