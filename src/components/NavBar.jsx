import React from 'react'
import '../components/NavBar.css';

const NavBar = () => {
  return (
    <div className="nav">
      <div className="container">
        <div className="logo">
        <img id='logo' src="./assets/logo.png" alt="Logo" />
        <h1>Sigwa</h1>
      </div>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/map">Map</a></li>
        <li><a href="/settings">Settings</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
      </div>
    </div>
  )
}

export default NavBar