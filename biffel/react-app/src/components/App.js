import React, { Component } from 'react'
import Header from './Header'
import Home from './Home'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import setupConnection from '../actions/setupConnection';
import fetchItems from '../actions/fetchItems';

class App extends Component{
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.setupConnection();
  }

  componentDidUpdate(prevProps){
    console.log('prevProps.web3', prevProps.web3);
    console.log('this.props', this.props.web3);
    if(!prevProps.web3 && this.props.web3){
      if(!this.props.web3.error){
        console.log('fetchItems');
        this.props.fetchItems(this.props.web3);
      }
    }
  }

  render(){
    if(this.props.web3 && this.props.web3.userAccount){
      return (
        <div>
          <Header/>
          <Home/>
        </div>
      )
    }
    return null;
  }
}


App.propTypes = {
  web3: PropTypes.object,
  setupConnection: PropTypes.func,
  fetchItems: PropTypes.func
};

function mapStateToProps(state) {
  return {
    web3: state.web3
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setupConnection: bindActionCreators(setupConnection, dispatch),
    fetchItems: bindActionCreators(fetchItems, dispatch)
  };
}

export default withRouter(connect(
  mapStateToProps, mapDispatchToProps
)(App));
