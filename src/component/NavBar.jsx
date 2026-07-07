import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import "./NavBar.css";


const NavBar = () => {


  const cartCount = 0;


  const location = useLocation();


  const isMalePage = location.pathname === "/male";



  const linkClass = ({ isActive }) =>
    isActive
      ? "nav-link custom-link active"
      : "nav-link custom-link";





  return (


    <nav
      className={`navbar navbar-expand-lg shadow-sm luxury-navbar ${
        isMalePage ? "male-theme" : ""
      }`}
    >


      <div className="container">



        <NavLink
          className="navbar-brand"
          to="/"
        >

          ✨ Pinky

        </NavLink>





        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >

          <span className="navbar-toggler-icon"></span>

        </button>





        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >



          <ul className="navbar-nav mx-auto align-items-center gap-2">


            <li className="nav-item">
              <NavLink to="/" className={linkClass}>
                Home
              </NavLink>
            </li>



            <li className="nav-item">
              <NavLink to="/shop" className={linkClass}>
                Shop
              </NavLink>
            </li>



            <li className="nav-item">
              <NavLink to="/female" className={linkClass}>
                Female
              </NavLink>
            </li>



            <li className="nav-item">
              <NavLink to="/male" className={linkClass}>
                Male
              </NavLink>
            </li>



            <li className="nav-item">
              <NavLink to="/about" className={linkClass}>
                About
              </NavLink>
            </li>


          </ul>







          <div className="d-flex align-items-center gap-3">



            <NavLink
              to="/cart"
              className="cart-icon"
            >

              <FaShoppingBag />


              <span className="cart-number">
                {cartCount}
              </span>


            </NavLink>





            <NavLink 
                  to="/login" 
                  className="login-btn"
              >
                  Login
            </NavLink>


            <NavLink 
                  to="/signup" 
                  className="signup-btn"
              >
                  Register
            </NavLink>



          </div>



        </div>



      </div>


    </nav>


  );

};


export default NavBar;