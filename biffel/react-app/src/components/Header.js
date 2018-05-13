import React from 'react'
import { Link } from 'react-router-dom'

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/buy'>Buy</Link></li>
        <li><Link to='/sell'>Sell</Link></li>
        <li><Link to='/profile'>Profile</Link></li>
      </ul>
    </nav>
  </header>
)

export default Header
