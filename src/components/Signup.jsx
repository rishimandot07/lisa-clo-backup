import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  // 🔥 NEW STATES
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  // 🔥 HANDLE SUBMIT
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/auth/signup", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name,
    email,
    password
  })
});
     const data = await res.json();
      console.log(data);
      navigate("/login");

    } catch (error) {
      console.log(error);
      alert("Error signing up");
    }
  };

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

      {/* 🔥 FORM WRAP */}
      <form onSubmit={handleSignup}>
        <div className="auth-container">
          <div className="auth-card">
            <h1>Create an Account</h1>

            {/* Full Name */}
            <div className="input-box">
              <span className="left-icon"><FaUser /></span>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="input-box">
              <span className="left-icon"><FaEnvelope /></span>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="input-box">
              <span className="left-icon"><FaLock /></span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="right-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <p className="helper-text">Must be at least 8 characters</p>

            {/* Confirm Password (optional for now) */}
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

            {/* 🔥 BUTTON */}
            <button className="auth-btn" type="submit">
              Sign Up
            </button>

            <div className="divider"></div>

            <p className="switch-text">
              Already have an account? <Link to="/login">Log In</Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
}