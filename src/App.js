// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeComponent from "./components/HomeComponent"; // Import your components
import "./App.scss";
import NotFound from "./components/NotFoundComponent";
import "bootstrap/scss/bootstrap.scss";
import Navbar from "./components/NavbarComponent";
import Footer from "./components/FooterComponent";
import Discover from "./components/DiscoverComponent";
import BookDetail from "./components/BookDetail";
import Cart from "./components/CartComponent";
import Login from "./components/LoginComponent";
import SignUp from "./components/SignUpComponent";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
