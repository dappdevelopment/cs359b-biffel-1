import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import userLogin from '../actions/userLogin'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

// The Player looks up the player using the number parsed from
// the URL's pathname. If no player is found with the given
// number, then a "player not found" message is displayed.
const Login = (props) => {
  var user = props.user;

  console.log('user', user);

  if(user.userAttemptedLogin === false) {
    props.userLogin('jaime1deverall', 'password')
  }

  if(user.userAttemptedLogin === true && user.username === undefined){
    return (
      <div>
        <h1>Login error.</h1>
      </div>
    )
  }

  return (
    <div>
      <h1>This is the login.</h1>
    </div>
  )
}

Login.propTypes = {
  user: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userLogin: bindActionCreators(userLogin, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
