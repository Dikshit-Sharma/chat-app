import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    console.log(typeof(file), 'file')

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      console.log(res,'res')

      const storageRef = ref(storage, displayName);

      // Convert blob file to Uint8Array
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = function() {
        const buffer = reader.result;
        const blobArray = new Uint8Array(buffer);
        
        // Upload the blobArray
        const uploadTask = uploadBytesResumable(storageRef, blobArray);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Handle progress, if needed
          },
          (error) => {
            // console.error("Error uploading file:", error);
            setErr(true);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then(async (downloadURL) => {
                console.log('Download URL:', downloadURL);
                await updateProfile(res.user, {
                  displayName,
                  photoURL: downloadURL,
                });
                await setDoc(doc(db, "users", res.user.uid), {
                  uid: res.user.uid,
                  displayName,
                  email,
                  photoURL: downloadURL,
                });

                await setDoc(doc(db, "userChats", res.user.uid), {});
                navigate("/login");
              })
              .catch((err) => {
                // console.error("Error getting download URL:", err);
                setErr(true);
              });
          }
        );
      }
    } catch (err) {
      // console.log('getting this error', err);
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat Hub</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="username" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button>Sign Up</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>You do have an account? <Link to="/login">Log In</Link></p>
      </div>
    </div>
  );
};

export default Register;
