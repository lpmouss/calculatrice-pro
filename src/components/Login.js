import React, { useState } from 'react';
import "./styles/Login.css";
//import useToken from "./useToken";

export default function Login() {
  const [login, setUserName] = useState();
  const [mdp, setPassword] = useState();

  const handleSubmit = async (e) => {
  e.preventDefault();

  const response = await fetch('http://localhost:8080/api/users/login', {
   method: 'POST',
   headers: { 
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'charset':'utf-8' },
   body: JSON.stringify({login : login, mdp : mdp})
  }).then(response => {
    if (response.ok) {
      alert(response.statusText)
    } else alert(response.statusText);
    
    return response.json();
        })
  .then((actualData) => {
    console.log(actualData);
      sessionStorage.setItem("token", actualData.id);
  })
  .catch(error => {
        alert(error);
    });
 };

  return(
    <>
    <div className="login-wrapper">
      <div className="main">
        <h1>Connexion</h1>
        <form >
          <label>
            <p>Username</p>
            <input type="text" onChange={e => setUserName(e.target.value)}/>
          </label>
          <label>
            <p>Password</p>
            <input type="password" onChange={e => setPassword(e.target.value)}/>
          </label>
          <div>
            <button onClick={handleSubmit}>Connexion</button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}