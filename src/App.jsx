import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import NavBar from "./component/NavBar.jsx";
import Footer from "./component/Footer.jsx";

import Home from "./Page/Home.jsx";
import Shop from "./Page/Shop.jsx";
import Checkout from "./Page/Checkout.jsx";
import Female from "./Page/Female";
import Male from "./Page/Male";
import About from "./Page/About";
import Login from "./Page/Login";
import Signup from "./Page/Signup";


function App() {

  return (

    <BrowserRouter>

      <NavBar />


      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />


        {/* Shop */}
        <Route
          path="/shop"
          element={<Shop />}
        />

        <Route
          path="/female"
          element={<Female />}
          />

        <Route
          path="/male"
          element={<Male />}
          />

        <Route path="/about" 
        element={<About />} />

        {/* Checkout */}
        <Route
          path="/cart"
          element={<Checkout />}
        />

        <Route path="/login" 
        element={<Login />} />

        <Route path="/signup" 
        element={<Signup />} />


      </Routes>


      <Footer />

    </BrowserRouter>

  );

}


export default App;