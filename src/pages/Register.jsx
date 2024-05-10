import Add from "../img/addAvatar.png";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import BriefIntro from "../components/BriefIntro";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
  
    // Regular expression to match the required email format
    const emailRegex = /^[0-9]+@juitsolan\.in$/;
  
    // Check if the email matches the required format
    if (!emailRegex.test(email)) {
      setErr("Invalid email format. Please use a valid email address ending with '@juitsolan.in'");
      setLoading(false);
      return;
    }
  
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(res.user); // Send verification email
  
      // Set up user profile data
      const userProfile = {
        uid: res.user.uid,
        displayName,
        email,
      };
  
      if (file) {
        // Upload avatar if provided
        const storageRef = ref(storage, `${displayName}_avatar`);
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            setErr("Error uploading file");
            setLoading(false);
          },
          async () => {
            // Avatar uploaded successfully, get download URL
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              userProfile.photoURL = downloadURL;
            } catch (error) {
              setErr("Error getting download URL");
              setLoading(false);
              return;
            }
  
            // Update user profile with avatar URL
            try {
              await updateProfile(res.user, userProfile);
              await setDoc(doc(db, "users", res.user.uid), userProfile);
              await setDoc(doc(db, "userChats", res.user.uid), {});
              navigate("/verify-email"); // Navigate to verification page
            } catch (error) {
              setErr("Error updating user profile");
              setLoading(false);
            }
          }
        );
      } else {
        // No avatar provided, proceed without uploading
        await updateProfile(res.user, userProfile);
        await setDoc(doc(db, "users", res.user.uid), userProfile);
        await setDoc(doc(db, "userChats", res.user.uid), {});
        navigate("/verify-email"); // Navigate to verification page
      }
    } catch (error) {
      setErr("Error registering user");
      setLoading(false);
    }
  };
  

  return (
    <div className="authPage">
      <div className="formContainer">
        <BriefIntro />
        <div className="formWrapper">
          <span className="logo">Chat Hub</span>
          <span className="title">Register</span>
          <form onSubmit={handleSubmit} className="form">
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input style={{ display: "none" }} type="file" id="file" />
            <label htmlFor="file" className="fileLabel">
              <img src={Add} alt="" />
              <span>Add an avatar</span>
            </label>
            <button disabled={loading} className="btn">
              Sign Up
            </button>
            {loading && <span className="loading">Uploading the image, please wait...</span>}
            {err && <span className="error">{err}</span>}
          </form>
          <p>
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
