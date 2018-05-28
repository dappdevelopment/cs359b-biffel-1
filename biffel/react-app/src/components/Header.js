import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import initiateCreateBiffel from '../actions/initiateCreateBiffel';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

const Header = (props) => (
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
            <LinkContainer to="/sell" onClick={(e) => props.initiateCreateBiffel()}>
              <NavItem>Create Biffel</NavItem>
            </LinkContainer>
            <LinkContainer to="/profile">
              <NavItem>Profile</NavItem>
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
  mapDispatchToProps
)(Header);
