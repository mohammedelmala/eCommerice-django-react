import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import { Container } from "react-bootstrap";
import Header from './components/Header';
import Footer from "./components/Footer"

import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/login" exact component={LoginScreen} />
          <Route path="/products/:id" exact component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
        </Container>


      </main>
      <Footer />

    </BrowserRouter>
  )
}

export default App
