import React from "react";
import {
  FaGoogle,
  FaFacebookF,
  FaTelegramPlane,
  FaLock,
  FaEnvelope
} from "react-icons/fa";

import "./Login.css";


function Login() {

  return (

    <div className="login-page">

      <div className="login-container">


        <div className="login-card">


          <div className="login-logo">

            ✨ Pinky

          </div>


          <h2>
            Welcome Back
          </h2>


          <p>
            Sign in to continue your luxury shopping experience.
          </p>



          <form>


            <div className="input-box">

              <FaEnvelope />

              <input
                type="email"
                placeholder="Email Address"
              />

            </div>



            <div className="input-box">

              <FaLock />

              <input
                type="password"
                placeholder="Password"
              />

            </div>



            <div className="forgot">

              Forgot Password?

            </div>



            <button className="login-btn">

              Login

            </button>


          </form>



          <div className="divider">

            <span>
              OR
            </span>

          </div>



          <div className="social-login">


            <button className="google">

              <FaGoogle />

              Continue with Google

            </button>



            <button className="facebook">

              <FaFacebookF />

              Continue with Facebook

            </button>



            <button className="telegram">

              <FaTelegramPlane />

              Continue with Telegram

            </button>


          </div>



          <div className="signup-text">

            Don't have an account?

            <span>
              Sign Up
            </span>

          </div>



        </div>


      </div>


    </div>

  );

}


export default Login;