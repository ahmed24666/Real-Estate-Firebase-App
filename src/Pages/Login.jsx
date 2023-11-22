import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";
const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const signin = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      setloading(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Successfully logged in",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      setloading(false);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div className="Login">
      <form class="login wrap" onSubmit={signin}>
        <div class="h1">Login</div>
        <input
          placeholder="Email"
          id="email"
          name="email"
          type="text"
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          onChange={(e) => setpassword(e.target.value)}
        />
        <input value="Login" class="btn3" type="submit" />
      </form>
    </div>
  );
};

export default Login;
