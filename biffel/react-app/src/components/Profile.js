import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import {Panel} from 'react-bootstrap';

// The Player looks up the player using the number parsed from
// the URL's pathname. If no player is found with the given
// number, then a "player not found" message is displayed.
const Profile = (props) => {
  return (
    <div>
      <Panel>
        <Panel.Heading>
          <Panel.Title componentClass="h3">Email</Panel.Title>
        </Panel.Heading>
        <Panel.Body>{props.user.email}</Panel.Body>
      </Panel>
      <Panel>
        <Panel.Heading>
          <Panel.Title componentClass="h3">Name</Panel.Title>
        </Panel.Heading>
        <Panel.Body>{props.user.name}</Panel.Body>
      </Panel>
      <Panel>
        <Panel.Heading>
          <Panel.Title componentClass="h3">Ethereum Address</Panel.Title>
        </Panel.Heading>
        <Panel.Body>{props.user.eth_address}</Panel.Body>
      </Panel>
    </div>
  )
}

Profile.propTypes = {
  user: PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: state.user
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
