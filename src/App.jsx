// import React from "react";
// import { useState } from 'react'
import "./App.css"
import NavBar from "./components/navBar/navBar"
import MainLayout from "./components/mainLayout/mainLayout.jsx";
import Footer from "./components/footer/footer.jsx"

function App() {
  return (
    <div className="flex flex-col justify-between p-5 h-screen w-full bg-[linear-gradient(to_right,#4B0082_5%,#3f5efb_50%,#4B0082_100%)] text-white">
      <NavBar
        renderLinks={() => (
          <>
            <li><a href="#">GitHub</a></li>
            <li><a href="#">Account</a></li>
          </>
        )}
      />

      <MainLayout />

      <Footer />
    </div>
  )
};

export default App;
