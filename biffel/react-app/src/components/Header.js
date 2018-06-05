import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import initiateCreateBiffel from '../actions/initiateCreateBiffel';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import './Header.css'

const Header = (props) => (
  <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Collapse className="salmon">
          <Nav pullRight >
            <LinkContainer to="/buy">
              <NavItem className="navitem">Buy Slots</NavItem>
            </LinkContainer>
            <LinkContainer to="/sell" onClick={(e) => props.initiateCreateBiffel()}>
              <NavItem className="navitem">Create Biffel</NavItem>
            </LinkContainer>
            <LinkContainer to="/profile">
              <NavItem className="navitem">Profile</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
)

Header.propTypes = {
  initiateCreateBiffel: PropTypes.func
};

function mapDispatchToProps(dispatch) {
  return {
    initiateCreateBiffel: bindActionCreators(initiateCreateBiffel, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps,
  null, 
  { pure: false }
)(Header);
