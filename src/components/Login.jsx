import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaHome
} from "react-icons/fa";
import "./auth.css";

export default function Login() {
  const [show, setShow] = useState(false);

  return (
    <>
      {/* 🔥 HEADER */}
      <header className="auth-header">
        <h1 className="auth-logo">Lisa</h1>

        <div className="auth-header-icons">
          <Link to="/" className="icon-btn">
            <FaHome />
          </Link>
        </div>
      </header>

      <div className="auth-container">
        <div className="auth-card">
          <h1>Welcome Back</h1>

          {/* Email */}
          <div className="input-box">
            <span className="left-icon"><FaEnvelope /></span>
            <input type="email" placeholder="Email" />
          </div>

          {/* Password */}
          <div className="input-box">
            <span className="left-icon"><FaLock /></span>
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
            />
            <span
              className="right-icon"
              onClick={() => setShow(!show)}
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button className="auth-btn">Log In</button>

          <p className="link">
            <Link to="/forgot-password">Forgot password?</Link>
          </p>

          <div className="divider"></div>

          <p className="switch-text">
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </>
  );
}