import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

import {
  FaGoogle,
  FaFacebookF,
  FaTelegramPlane,
  FaUser,
  FaEnvelope,
  FaLock
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext.jsx";

const Signup = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError("Please fill in every field.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    try {
      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      navigate("/", { replace: true });
    } catch (err) {
      setError(err?.message || "Could not create your account. Please try again.");
    }
  };

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

        {error && (
          <div className="alert alert-danger py-2" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="signup-input">
            <FaUser />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </div>


          <div className="signup-input">
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


          <div className="signup-input">
            <FaLock />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </div>


          <div className="signup-input">
            <FaLock />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </div>


          <button className="signup-btn" type="submit" disabled={loading}>
            {loading ? "Creating account…" : "Create Account"}
          </button>

        </form>


        <div className="luxury-divider">
            <span>✦</span>
            <p>Or continue with</p>
            <span>✦</span>
        </div>


        <button className="social-btn google" type="button">
          <FaGoogle />
          Continue with Google
        </button>


        <button className="social-btn facebook" type="button">
          <FaFacebookF />
          Continue with Facebook
        </button>


        <button className="social-btn telegram" type="button">
          <FaTelegramPlane />
          Continue with Telegram
        </button>


        <p className="login-link">
          Already have an account?
          <Link to="/login">
            Login
          </Link>
        </p>


      </div>

    </div>
  );
};

export default Signup;
