import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./styles/enhancements.css";

import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { FavoritesProvider } from "./context/FavoritesContext.jsx";

import NavBar from "./component/NavBar.jsx";
import Footer from "./component/Footer.jsx";
import RequireAuth from "./component/RequireAuth.jsx";

import Home from "./Page/Home.jsx";
import Shop from "./Page/Shop.jsx";
import Detail from "./Page/Detail.jsx";
import Checkout from "./Page/Checkout.jsx";
import Female from "./Page/Female";
import Male from "./Page/Male";
import About from "./Page/About";
import Login from "./Page/Login";
import Signup from "./Page/Signup";
import Favorites from "./Page/Favorites";
import AddProduct from "./Page/Addproduct";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <BrowserRouter>
          <NavBar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/female" element={<Female />} />
            <Route path="/male" element={<Male />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route
              path="/addproduct"
              element={
                <RequireAuth requiredRole="ADMIN">
                  <AddProduct />
                </RequireAuth>
              }
            />
          </Routes>

          <Footer />
          </BrowserRouter>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
