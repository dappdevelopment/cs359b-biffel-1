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
  if(props.items === null){
    return null
  }

  let id = parseInt(props.match.params.id);

  if (isNaN(id)) {
    return <div>Sorry, but no item</div>
  }
  
  var item = props.items[id]
  return (
    <div>
      <h1>{item.seller} (#{item.id})</h1>
      <h2>Slot Price: {item.slotPrice}</h2>
    </div>
  )
}

DetailedItem.propTypes = {
  item: PropTypes.object
};

function mapStateToProps(state) {
  return {
    items: state.items
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
)(DetailedItem);
