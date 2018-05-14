import React from 'react'
import Header from './Header'
import Home from './Home'
import Login from './Login/Login'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import api from '../api.js'

const App = (props) => {
  var result = api.checkWeb3();
  console.log('web3', result);

  if(props.user.email === undefined){
    return (
      <div>
        <Login/>
      </div>
    )
  }
  return (
    <div>
      <Header/>
      <Home/>
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

export default withRouter(connect(
  mapStateToProps, null
)(App));
