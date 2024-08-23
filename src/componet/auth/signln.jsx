import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import "./Signin.css"; // Import a CSS file for styling

import {useContext} from 'react'
import { NavContext } from "../navbar/router";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {setShowNav} = useContext(NavContext);
  setShowNav(false)

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Logged in:", userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sign-in-container">
      <form onSubmit={signIn} className="sign-in-form">
        <h1>J'ai déja un Compte</h1>
        <input
          type="email"
          placeholder="Entrez votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="sign-in-input"
        ></input>
        <input
          type="password"
          placeholder="Entrez votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="sign-in-input"
        ></input>
        <button type="submit" className="sign-in-button">Se Connecter</button>
      </form>
    </div>
  );
};

export default SignIn;
