import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  // <header>
  //   <nav>
  //     <ul>
  //       <li><Link to='/buy'>Buy</Link></li>
  //       <li><Link to='/sell'>Sell</Link></li>
  //       <li><Link to='/profile'>Profile</Link></li>
  //     </ul>
  //   </nav>
  // </header>
  <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Biffel</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/buy">
              <NavItem>Buy Slots</NavItem>
            </LinkContainer>
            <LinkContainer to="/sell">
              <NavItem>Create Waffle</NavItem>
            </LinkContainer>
            <LinkContainer to="/profile">
              <NavItem>Profile</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
)

export default Header
