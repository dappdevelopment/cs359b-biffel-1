import React from 'react'
import Header from './Header'
import Home from './Home'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import setupConnection from '../actions/setupConnection';

const App = (props) => {
  //props.web3.userAccount === undefined && props.web3.message === undefined
  if(props.web3 === null){
    props.setupConnection();
    return null;
  }
  if(props.web3.loading){
    return (
      <div>
        {'Loading'}
      </div>
    )
  }
  if(props.web3.userAccount){
    return (
      <div>
        <Header/>
        <Home/>
      </div>
    )
  }
  return (
    <div>
      {props.web3.error}
    </div>
  )
}

//<Header/>

App.propTypes = {
  user: PropTypes.object
};

function mapStateToProps(state) {
  return {
    web3: state.web3
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setupConnection: bindActionCreators(setupConnection, dispatch)
  };
}

export default withRouter(connect(
  mapStateToProps, mapDispatchToProps
)(App));
