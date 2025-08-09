import React from 'react'
import './Header.css';

const Header = ({ city, setCity, getWeather }) => 
 (
    <div className="header" style={{backgroundImage: 'url(/assets/header-background.png)'}}>{/* Background image for header*/}
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <input type="text" value={city} placeholder="Enter city" onChange={(e) => setCity(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && getWeather()} style={{padding: '10px 40px 10px 15px', // Right padding for button 
        borderRadius: '20px', 
        border: '1px solid #ccc',
        width: '500px', 
        outline: 'none',
      }}/>
      <button onClick={getWeather}
      style={{
      position: 'absolute',
      right: '25px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
    }}
    >
        <img src="/assets/search-icon.png" alt="Search" style={{ width: '20px', height: '20px' }}/>
      </button>
      </div>
  </div>
  )

export default Header