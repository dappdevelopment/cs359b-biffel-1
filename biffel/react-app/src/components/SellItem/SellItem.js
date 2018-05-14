import React, { Component } from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import createWaffle from '../../actions/createWaffle'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { Button, FormGroup, FormControl, ControlLabel, Alert } from "react-bootstrap";
import './SellItem.css'

class SellItem extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      title: "",
      slotPrice: 0,
      numberOfSlots: 0
    };
  }

  validateForm() {
    return this.state.title.length > 0 && this.state.slotPrice > 0 && this.state.numberOfSlots > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.createWaffle(this.state.title, this.state.slotPrice, this.state.numberOfSlots);
  }

  render() {
    return (
      <div className="SellItem">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="title" bsSize="large">
            <ControlLabel>Title</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="slotPrice" bsSize="large">
            <ControlLabel>Slot Price</ControlLabel>
            <FormControl
              value={this.state.slotPrice}
              onChange={this.handleChange}
              type="number"
            />
          </FormGroup>
          <FormGroup controlId="numberOfSlots" bsSize="large">
            <ControlLabel>Number of Slots</ControlLabel>
            <FormControl
              value={this.state.numberOfSlots}
              onChange={this.handleChange}
              type="number"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Create Waffle
          </Button>
        </form>
      </div>
    );
  }
}

// SellItem.propTypes = {
//   user: PropTypes.object,
// };
//
// function mapStateToProps(state) {
//   return {
//     user: state.user
//   };
// }

function mapDispatchToProps(dispatch) {
  return {
    createWaffle: bindActionCreators(createWaffle, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(SellItem);
