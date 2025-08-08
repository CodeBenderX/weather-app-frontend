import React from 'react'
import '../components/NavBar.css';

const NavBar = () => {
  return (
    <div className="nav">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/map">Map</a></li>
        <li><a href="/settings">Settings</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </div>
  )
}

export default NavBar