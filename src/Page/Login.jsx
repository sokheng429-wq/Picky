import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaGoogle,
  FaFacebookF,
  FaTelegramPlane,
  FaLock,
  FaEnvelope
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext.jsx";

import "./Login.css";

function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email.trim() || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      await login({ email: form.email.trim(), password: form.password });
      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err?.message || "Could not sign in. Please try again.");
    }
  };

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

          {error && (
            <div className="alert alert-danger py-2" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>


            <div className="input-box">

              <FaEnvelope />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />

            </div>



            <div className="input-box">

              <FaLock />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />

            </div>



            <div className="forgot">

              Forgot Password?

            </div>



            <button className="login-btn" type="submit" disabled={loading}>

              {loading ? "Signing in…" : "Login"}

            </button>

          </form>

          

          <div className="divider">

            <span>
              OR
            </span>

          </div>



          <div className="social-login">


            <button className="google" type="button">

              <FaGoogle />

              Continue with Google

            </button>



            <button className="facebook" type="button">

              <FaFacebookF />

              Continue with Facebook

            </button>



            <button className="telegram" type="button">

              <FaTelegramPlane />

              Continue with Telegram

            </button>


          </div>



          <div className="signup-text">

            Don't have an account?

            <Link to="/signup" style={{ color: "#ff1493", fontWeight: 600, marginLeft: 5 }}>
              Sign Up
            </Link>

          </div>



        </div>


      </div>


    </div>

  );

}


export default Login;
