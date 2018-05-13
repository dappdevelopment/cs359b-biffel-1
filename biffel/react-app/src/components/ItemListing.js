import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import fetchCatalog from '../actions/fetchCatalog';
import PropTypes from 'prop-types';

// The FullRoster iterates over all of the players and creates
// a link to their profile page.
const ItemListing = (props) => {
  console.log('items', props.items);
  props.fetchCatalog();
  return (
    <div>
      <ul>
        {
          props.items.map(i => (
            <li key={i.id}>
              <Link to={`/items/${i.id}`}>{i.name}</Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}


ItemListing.propTypes = {
  items: PropTypes.array
};

function mapStateToProps(state) {
  return {
    items: state.items
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCatalog: bindActionCreators(fetchCatalog, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemListing);
