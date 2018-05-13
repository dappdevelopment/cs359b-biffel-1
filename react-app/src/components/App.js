import React from 'react'
//import Header from './Header'
import LoggedIn from './LoggedIn'
import Login from './Login'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

const App = (props) => {
  if(props.user.username === undefined){
    return (
      <div>
        <Login/>
      </div>
    )
  }
  return (
    <div>
      <LoggedIn/>
    </div>
  )
}

App.propTypes = {
  user: PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(
  mapStateToProps, null
)(App);
