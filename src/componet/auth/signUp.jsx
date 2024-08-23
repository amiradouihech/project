import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import "./signUp.css"; // Import a CSS file for styling

import {useContext} from 'react'
import { NavContext } from "../navbar/router";
const SignUp = () => {
  
  const {setShowNav} = useContext(NavContext);
  setShowNav(false)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [age, setAge] = useState("");
  const [numeroTelephone, setNumeroTelephone] = useState("");
  const [pays, setPays] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User created:", userCredential);
        console.log({
          nom,
          prenom,
          age,
          numeroTelephone,
          pays,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sign-up-container">
      <form onSubmit={signUp} className="sign-up-form">
        <h1>Créer un Compte</h1>
        <input
          type="text"
          placeholder="Entrez votre nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="sign-up-input"
        ></input>
        <input
          type="text"
          placeholder="Entrez votre prénom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          className="sign-up-input"
        ></input>
        <input
          type="number"
          placeholder="Entrez votre age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="sign-up-input"
        ></input>
        <input
          type="text"
          placeholder="Entrez votre numéro de téléphone"
          value={numeroTelephone}
          onChange={(e) => setNumeroTelephone(e.target.value)}
          className="sign-up-input"
        ></input>
        <input
          type="text"
          placeholder="Entrez votre pays"
          value={pays}
          onChange={(e) => setPays(e.target.value)}
          className="sign-up-input"
        ></input>
        <input
          type="email"
          placeholder="Entrez votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="sign-up-input"
        ></input>
        <input
          type="password"
          placeholder="Entrez votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="sign-up-input"
        ></input>
        <button type="submit" className="sign-up-button">Registrer</button>
      </form>
    </div>
  );
};

export default SignUp;
