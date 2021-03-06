import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import { Container } from "react-bootstrap";
import Header from './components/Header';
import Footer from "./components/Footer"

import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";

import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserList from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";

import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderListScreen from "./screens/OrderListScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/login" exact component={LoginScreen} />
          <Route path="/register" exact component={RegisterScreen} />

          <Route path="/profile" exact component={ProfileScreen} />
          <Route path="/products/:id" exact component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/admin/userlist/" exact component={UserList} />
          <Route path="/admin/:id/edit" exact component={UserEditScreen} />

          <Route path="/admin/productlist" component={ProductListScreen} />
          <Route path="/admin/product/:id/edit" component={ProductEditScreen} />

          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />



          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/admin/orderlist/" component={OrderListScreen} />



        </Container>


      </main>
      <Footer />

    </BrowserRouter>
  )
}

export default App
