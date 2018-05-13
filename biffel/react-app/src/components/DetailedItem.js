import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import fetchItemDetails from '../actions/fetchItemDetails'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

// The Player looks up the player using the number parsed from
// the URL's pathname. If no player is found with the given
// number, then a "player not found" message is displayed.
const DetailedItem = (props) => {

  let id = parseInt(props.match.params.id);

  if (isNaN(id)) {
    return <div>Sorry, but no item</div>
  }

  props.fetchItemDetails(id);

  if (props.item === null) {
    return <div>Sorry, but no item was found.</div>
  }

  return (
    <div>
      <h1>{props.item.name} (#{props.item.id})</h1>
      <h2>Slot Price: {props.item.slotPrice}</h2>
      <Link to='/items'>Back</Link>
    </div>
  )
}

DetailedItem.propTypes = {
  item: PropTypes.object
};

function mapStateToProps(state) {
  return {
    item: state.item
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchItemDetails: bindActionCreators(fetchItemDetails, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailedItem);
