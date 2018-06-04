import React, { Component } from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import buySlot from '../actions/buySlot'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { Button, FormGroup, FormControl, ControlLabel, Alert, Panel, Radio } from "react-bootstrap";

// The Player looks up the player using the number parsed from
// the URL's pathname. If no player is found with the given
// number, then a "player not found" message is displayed.

class DetailedItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.props.buySlot(this.props.web3, this.props.match.params.id);
  }

  render(){
    if(this.props.items === null){
      return null
    }

    let id = parseInt(this.props.match.params.id);

    if (isNaN(id)) {
      return <div>Sorry, but no item</div>
    }

    var item = this.props.items[id]
    return (
      <div>
        <div>
          <h1>{item.seller} (#{item.id})</h1>
          <h2>Slot Price: {item.slotPrice}</h2>
        </div>
        <Button onClick={this.handleClick}>
          {'Buy slot'}
        </Button>
      </div>
    )
  }
}

DetailedItem.propTypes = {
  items: PropTypes.object
};

function mapStateToProps(state) {
  return {
    items: state.items,
    web3: state.web3
  };
}

function mapDispatchToProps(dispatch) {
  return {
    buySlot: bindActionCreators(buySlot, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailedItem);
