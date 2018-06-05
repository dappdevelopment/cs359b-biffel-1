import React, { Component } from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import buySlot from '../../actions/buySlot';
import initiateBiffel from '../../actions/initiateBiffel';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { Button, FormGroup, FormControl, ControlLabel, Alert, Panel, Radio } from "react-bootstrap";

class DetailedItem extends Component {
  constructor(props) {
    super(props);
    this.handleBuySlot = this.handleBuySlot.bind(this);
    this.handleInitiateBiffel = this.handleInitiateBiffel.bind(this);
    this.displayBuySlotButton = this.displayBuySlotButton.bind(this);
  }

  handleBuySlot(){
    var item = this.props.items[this.props.match.params.id]
    var value = item.slotPrice + item.bounty
    console.log('value', value);
    this.props.buySlot(this.props.contract, this.props.userAccount, this.props.match.params.id, value);
  }

  handleInitiateBiffel(){
    this.props.initiateBiffel(this.props.contract, this.props.userAccount, this.props.match.params.id);
  }

  displayBuySlotButton(){
    var item = this.props.items[this.props.match.params.id]
    console.log('this.props.blockNumber', this.props.blockNumber);
    if(item.startBlock === 0){
      return (
        <Button onClick={this.handleBuySlot}>
          {'Buy slot'}
        </Button>
      )
    }
    return null
  }

  displayInitiateBiffelButton(){
    var item = this.props.items[this.props.match.params.id]
    if(item.startBlock === 0){
      return null;
    }
    console.log('this.props.blockNumber', this.props.blockNumber);
    if(this.props.blockNumber && this.props.blockNumber - item.startBlock > 10){
      return (
        <Button onClick={this.handleInitiateBiffel}>
          {'Initiate Biffel'}
        </Button>
      )
    }
    return null
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
    if(item.winner){
      return (
        <Panel>
          <Panel.Heading>
            <Panel.Title>{`${item.title} (#${item.id})`}</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h2">{'Winner'}</Panel.Title>
              </Panel.Heading>
              <Panel.Body>{item.winner}</Panel.Body>
            </Panel>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h2">{'Result'}</Panel.Title>
              </Panel.Heading>
              <Panel.Body>{item.winner === this.props.userAccount ? 'You won!' : 'You lost'}</Panel.Body>
            </Panel>
          </Panel.Body>
        </Panel>
      )
    }
    return (
      <div>
        <Panel>
          <Panel.Heading>
            <Panel.Title>{`${item.title} (#${item.id})`}</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h2">{'Slot Price'}</Panel.Title>
              </Panel.Heading>
              <Panel.Body>{item.slotPrice}</Panel.Body>
            </Panel>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h2">{'Slots Remaining'}</Panel.Title>
              </Panel.Heading>
              <Panel.Body>{item.slotCount - item.buyers.length}</Panel.Body>
            </Panel>

            {this.props.userAccount !== item.seller ?
              (
                <div>
                  <Panel>
                    <Panel.Heading>
                      <Panel.Title componentClass="h2">{'Slots Owned'}</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>{getSlotsOwned(item.buyers, this.props.userAccount)}</Panel.Body>
                  </Panel>
                  {this.displayBuySlotButton()}
                </div>
              )
              :
              null
            }
            {this.displayInitiateBiffelButton()}
          </Panel.Body>
        </Panel>
      </div>
    )
  }
}

DetailedItem.propTypes = {
  items: PropTypes.array
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
    web3: state.web3.web3,
    contract: state.web3.contract,
    userAccount: state.web3.userAccount,
    blockNumber: state.web3.blockNumber
  };
}

function mapDispatchToProps(dispatch) {
  return {
    buySlot: bindActionCreators(buySlot, dispatch),
    initiateBiffel: bindActionCreators(initiateBiffel, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailedItem);
