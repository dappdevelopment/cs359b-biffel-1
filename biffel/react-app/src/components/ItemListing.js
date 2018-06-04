import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

// The FullRoster iterates over all of the players and creates
// a link to their profile page.
const ItemListing = (props) => {
  if(props.items === null){
    return null;
  }
  return (
    <div>
      <ul>
        {props.items ?
          props.items.map(i => (
            <li key={i.id}>
              <Link to={`/buy/${i.id}`}>{i.title}</Link>
            </li>
          ))
          :
          null
        }
      </ul>
    </div>
  )
}

ItemListing.propTypes = {
  items: PropTypes.array,
  web3: PropTypes.object
};

function mapStateToProps(state) {
  return {
    items: state.items,
    web3: state.web3
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     fetchCatalog: bindActionCreators(fetchCatalog, dispatch)
//   };
// }

export default connect(
  mapStateToProps,
  null
)(ItemListing);
