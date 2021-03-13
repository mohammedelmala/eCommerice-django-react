import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import Header from './components/Header';
import Footer from "./components/Footer"

import HomeScreen from "./screens/HomeScreen";


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Route to="/" exact component={HomeScreen} />
      </main>
      <Footer />

    </BrowserRouter>
  )
}

export default App
