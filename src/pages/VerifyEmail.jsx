import React from "react";
import { Link } from "react-router-dom";

const VerifyEmail = () => {
  return (
    <div className="authPage">
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">Chat Hub</span>
          <span className="title">Verify Your Email</span>
          <p>
            A verification email has been sent to your email address. Please click on the verification link to activate your account.
          </p>
          <p>
            If you haven't received the email, you can <Link to="/resend-verification">resend</Link> it.
          </p>
          <p>
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
