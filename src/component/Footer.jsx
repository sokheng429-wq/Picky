import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";


const Footer = () => {


  return (

    <footer className="footer">


      <div className="container">


        <div className="row gy-4">



          {/* Brand */}

          <div className="col-lg-4 col-md-6">


            <h2 className="footer-logo">
              ✨ Pinky
            </h2>


            <p className="footer-text">

              Discover your beauty, style and confidence.
              Fashion made with love 💕

            </p>



            <div className="social-box">


              <a href="#">
                ♡
              </a>


              <a href="#">
                ✨
              </a>


              <a href="#">
                📸
              </a>


              <a href="#">
                💌
              </a>


            </div>


          </div>





          {/* Links */}

          <div className="col-lg-2 col-md-6">


            <h5>
              Explore
            </h5>


            <ul>


              <li>
                <NavLink to="/">
                  Home
                </NavLink>
              </li>


              <li>
                <NavLink to="/shop">
                  Shop
                </NavLink>
              </li>


              <li>
                <NavLink to="/female">
                  Female
                </NavLink>
              </li>


              <li>
                <NavLink to="/male">
                  Male
                </NavLink>
              </li>


            </ul>


          </div>








          {/* Customer */}

          <div className="col-lg-3 col-md-6">


            <h5>
              Customer Care
            </h5>


            <ul>


              <li>
                About Us
              </li>


              <li>
                Contact
              </li>


              <li>
                Shipping
              </li>


              <li>
                Privacy Policy
              </li>


            </ul>


          </div>







          {/* Newsletter */}

          <div className="col-lg-3 col-md-6">


            <h5>
              Join Pinky 💗
            </h5>


            <p>
              Get beauty tips and special offers.
            </p>


            <div className="email-box">


              <input
                type="email"
                placeholder="Your email"
              />


              <button>
                Join
              </button>


            </div>


          </div>



        </div>





        <hr />



        <div className="copyright">

          © 2026 Pinky. Made with 💖 for beautiful people.

        </div>



      </div>



      {/* Floating hearts */}

      <div className="heart heart1">
        💗
      </div>


      <div className="heart heart2">
        ✨
      </div>


      <div className="heart heart3">
        💕
      </div>



    </footer>

  );

};


export default Footer;