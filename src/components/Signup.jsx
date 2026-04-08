import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaHome
} from "react-icons/fa";
import logo from "../assets/logo.png";
import "./auth.css";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      {/* 🔥 HEADER */}
      <header className="auth-header">
        <Link to="/">
          <img src={logo} alt="Lisa Logo" className="logo" />
        </Link>

        <div className="auth-header-icons">
          <Link to="/" className="icon-btn">
            <FaHome />
          </Link>
        </div>
      </header>

      <div className="auth-container">
        <div className="auth-card">
          <h1>Create an Account</h1>

          {/* Full Name */}
          <div className="input-box">
            <span className="left-icon"><FaUser /></span>
            <input type="text" placeholder="Full Name" />
          </div>

          {/* Email */}
          <div className="input-box">
            <span className="left-icon"><FaEnvelope /></span>
            <input type="email" placeholder="Email" />
          </div>

          {/* Password */}
          <div className="input-box">
            <span className="left-icon"><FaLock /></span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
            <span
              className="right-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <p className="helper-text">Must be at least 8 characters</p>

          {/* Confirm Password */}
          <div className="input-box">
            <span className="left-icon"><FaLock /></span>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
            />
            <span
              className="right-icon"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button className="auth-btn">Sign Up</button>

          <div className="divider"></div>

          <p className="switch-text">
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </>
  );
}