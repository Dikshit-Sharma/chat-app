import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import BriefIntro from "../components/BriefIntro";


const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="authPage">
      <div className="formContainer">
      <BriefIntro />
        <div className="formWrapper">
          <span className="logo">Chat Hub</span>
          <span className="title">Login</span>
          <form onSubmit={handleSubmit} className="form">
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button className="btn">Sign in</button>
            {err && <span className="error">Something went wrong</span>}
          </form>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default Login;
