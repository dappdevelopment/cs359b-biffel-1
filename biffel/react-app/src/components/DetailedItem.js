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
    var item = this.props.items[this.props.match.params.id]
    var value = item.slotPrice + item.bounty
    console.log('value', value);
    this.props.buySlot(this.props.web3, this.props.match.params.id, value);
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
        <Panel>
          <Panel.Heading>
            <Panel.Title>
              `${item.title} (#${item.id})`
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <Panel>
              <Panel.Title>
                <Panel.Heading>`Slot Price`</Panel.Heading>
              </Panel.Title>
              <Panel.Body>{item.slotPrice}</Panel.Body>
            </Panel>
            <Panel>
              <Panel.Title>
                <Panel.Heading>`Slots Remaining`</Panel.Heading>
              </Panel.Title>
              <Panel.Body>{item.slotCount - item.buyers.length}</Panel.Body>
            </Panel>

            {this.props.web3.userAccount !== item.seller
              <div>
                <Panel>
                  <Panel.Title>
                    <Panel.Heading>`Slots Owned`</Panel.Heading>
                  </Panel.Title>
                  <Panel.Body>{getSlotsOwned(item.buyers, this.props.web3.userAccount)}</Panel.Body>
                </Panel>
                <Button onClick={this.handleClick}>
                  {'Buy slot'}
                </Button>
              </div>
              :
              null
            }
          </Panel.Body>

        </Panel>
      </div>
    )
  }
}

DetailedItem.propTypes = {
  items: PropTypes.object
};

function getSlotsOwned(buyers, myAccount){
  var count = 0;
  for(let buyer of buyers){
    if(buyer === myAccount){
      count += 1;
    }
  }
  return count;
}

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
