import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

// The Player looks up the player using the number parsed from
// the URL's pathname. If no player is found with the given
// number, then a "player not found" message is displayed.
const SellItem = (props) => {

  return (
    <div>
      <h1>Sell Item</h1>
    </div>
  )
}

export default SellItem

// DetailedItem.propTypes = {
//   item: PropTypes.object
// };
//
// function mapStateToProps(state) {
//   return {
//     item: state.item
//   };
// }
//
// function mapDispatchToProps(dispatch) {
//   return {
//     fetchItemDetails: bindActionCreators(fetchItemDetails, dispatch)
//   };
// }
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(DetailedItem);
