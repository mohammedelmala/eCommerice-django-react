import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import { Container } from "react-bootstrap";
import Header from './components/Header';
import Footer from "./components/Footer"

import HomeScreen from "./screens/HomeScreen";


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Route to="/" exact component={HomeScreen} />
        </Container>


      </main>
      <Footer />

    </BrowserRouter>
  )
}

export default App
