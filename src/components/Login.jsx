import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaHome
} from "react-icons/fa";
import logo from "../assets/logo.png";
import "./auth.css";
import { apiPath } from "../config/api";

export default function Login() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  // 🔥 NEW STATES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔥 HANDLE LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(apiPath("/api/auth/login"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await res.json();

  if (res.ok) {
   localStorage.setItem("token", data.token);
   navigate("/");
  } else {
    alert(data.error || data.message || "Login failed");
  }
    } catch (error) {
      console.log(error);
      alert("Error logging in");
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

      {/* 🔥 FORM */}
      <form onSubmit={handleLogin}>
        <div className="auth-container">
          <div className="auth-card">
            <h1>Welcome Back</h1>

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
                type={show ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="right-icon"
                onClick={() => setShow(!show)}
              >
                {show ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button className="auth-btn" type="submit">
              Log In
            </button>

            <p className="link">
              <Link to="/forgot-password">Forgot password?</Link>
            </p>

            <div className="divider"></div>

            <p className="switch-text">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
}