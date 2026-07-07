import React from "react";
import "./Signup.css";

import {
  FaGoogle,
  FaFacebookF,
  FaTelegramPlane,
  FaUser,
  FaEnvelope,
  FaLock
} from "react-icons/fa";

const Signup = () => {
  return (
    <div className="signup-page">

      <div className="signup-card">

        <div className="signup-logo">
          ✨ Pinky
        </div>

        <h2>Create Your Account</h2>

        <p className="signup-text">
          Join Pinky and discover luxury fashion & beauty collections.
        </p>


        <form>

          <div className="signup-input">
            <FaUser />
            <input 
              type="text"
              placeholder="Full Name"
            />
          </div>


          <div className="signup-input">
            <FaEnvelope />
            <input 
              type="email"
              placeholder="Email Address"
            />
          </div>


          <div className="signup-input">
            <FaLock />
            <input 
              type="password"
              placeholder="Password"
            />
          </div>


          <div className="signup-input">
            <FaLock />
            <input 
              type="password"
              placeholder="Confirm Password"
            />
          </div>


          <button className="signup-btn">
            Create Account
          </button>

        </form>


        <div className="luxury-divider">
            <span>✦</span>
            <p>Or continue with</p>
            <span>✦</span>
        </div>


        <button className="social-btn google">
          <FaGoogle />
          Continue with Google
        </button>


        <button className="social-btn facebook">
          <FaFacebookF />
          Continue with Facebook
        </button>


        <button className="social-btn telegram">
          <FaTelegramPlane />
          Continue with Telegram
        </button>


        <p className="login-link">
          Already have an account?
          <a href="/login">
            Login
          </a>
        </p>


      </div>

    </div>
  );
};

export default Signup;