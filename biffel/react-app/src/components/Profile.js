import React, { Component } from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import {Panel} from 'react-bootstrap';

// The Player looks up the player using the number parsed from
// the URL's pathname. If no player is found with the given
// number, then a "player not found" message is displayed.

class Profile extends Component {
  constructor(props){
    super(props);
  }

  render (){
    return (
      <div>
        <Panel>
          <Panel.Heading>
            <Panel.Title componentClass="h3">Your Ethereum Address</Panel.Title>
          </Panel.Heading>
          <Panel.Body>{this.props.web3.userAccount}</Panel.Body>
        </Panel>
      </div>
    )
  }
}

Profile.propTypes = {
  user: PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: state.user,
    items: state.items,
    web3: state.web3
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     fetchItemDetails: bindActionCreators(fetchItemDetails, dispatch)
//   };
// }

export default connect(
  mapStateToProps,
  null
)(Profile);
