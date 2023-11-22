import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, storage, db } from "./../firebase.config.js";
import { ref, getDownloadURL } from "@firebase/storage";
import { uploadBytes } from "firebase/storage";
import Swal from "sweetalert2";

const Signup = () => {
  const [email, setemail] = useState("");
  const [file, setfile] = useState("");
  const [password, setpassword] = useState("");
  const [username, setusername] = useState(null);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const signup = async (e) => {
    e.preventDefault();
    setloading(true);
    const storageRef = ref(storage, `images/${Date.now() + username}`);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = await userCredential.user;
      await uploadBytes(storageRef, file);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Image Upload",
        showConfirmButton: false,
        timer: 1500,
      });
      const downloadURL = await getDownloadURL(storageRef);
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: username,
        email,
        photoURL: downloadURL,
      });
      // update User Profile
      await updateProfile(user, {
        displayName: username,
        photoURL: downloadURL,
      });
      setloading(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Account Created",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      setloading(false);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "something went wrong",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div className="Login">
      <form class="login wrap" onSubmit={signup}>
        <div class="h1">Signup</div>
        <input
          placeholder="Username"
          id="username"
          name="username"
          type="text"
          onChange={(e) => setusername(e.target.value)}
        />
        <input
          pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
          placeholder="Email"
          id="email"
          name="email"
          type="text"
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          placeholder="Password"
          id="password"
          name="password"
          type="password"
          onChange={(e) => setpassword(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setfile(e.target.files[0])}
        />
        <input value="Signup" class="btn3" type="submit" />
      </form>
    </div>
  );
};

export default Signup;
