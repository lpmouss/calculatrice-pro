import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Calculator from "./components/Calculator";
import Login from "./components/Login";
//import useToken from "./components/useToken";

function App() {
  const token = sessionStorage.getItem("token");

  if(!token) {
    return <Login />
  } else return <Calculator />

  /*return (
  <BrowserRouter>
    <Routes>
    <Route path ="/" element={<Login />} />
    <Route path ="dashboard" element={<Calculator />} />
    </Routes>
</BrowserRouter>
  );*/
}

export default App;
