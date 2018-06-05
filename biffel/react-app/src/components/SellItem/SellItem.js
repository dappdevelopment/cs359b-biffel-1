import React, { Component } from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import createBiffel from '../../actions/createBiffel'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { Button, FormGroup, FormControl, ControlLabel, Alert } from "react-bootstrap";
import './SellItem.css'
import ipfs from '../../ipfs.js'

class SellItem extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      title: props.title || "",
      slotPrice: props.slotPrice || 0,
      numberOfSlots: props.numberOfSlots || 0,
      bounty: props.bounty || 0,
      buffer: ''
    };
  }

  validateForm() {
    return this.state.title.length > 0 && this.state.slotPrice > 0 && this.state.numberOfSlots > 0 && this.state.bounty > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {

    event.preventDefault();
    var values = {...this.state};
    this.props.createBiffel(values, this.props.web3);
  }

  captureFile =(event) => {
    console.log('capturing file')  
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => this.convertToBuffer(reader)
          
  }

  convertToBuffer = async(reader) => {
    console.log('converting file')
      //file is converted to a buffer for upload to IPFS
    console.log('buffer',reader.result)

    const buffer = await Buffer.from(reader.result);
      //set this buffer -using es6 syntax
    this.setState({buffer});
    console.log(this.state.buffer)

    await ipfs.add(this.state.buffer, (err, ipfsHash) => {
        console.log(err,ipfsHash);
        //setState by setting ipfsHash to ipfsHash[0].hash 
        //this.setState({ ipfsHash:ipfsHash[0].hash });
    })
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
          <FormGroup>
            <ControlLabel>Item Image</ControlLabel>
            <input 
              type = "file"
              onChange = {this.captureFile}
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
          <FormGroup controlId="bounty" bsSize="large">
            <ControlLabel>Bounty</ControlLabel>
            <FormControl
              value={this.state.bounty}
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
            {'Create Biffel'}
          </Button>
          {this.props.error && !this.props.success ?
            (
              <Alert bsStyle='danger'>
                {this.props.error}
              </Alert>
            )
            :
            null
          }
          {this.props.success && !this.props.error ?
            (
              <Alert bsStyle='success'>
                {'Biffel created successful'}
              </Alert>
            )
            :
            null
          }
        </form>
      </div>
    );
  }
}

SellItem.propTypes = {
  values: PropTypes.object,
  web3: PropTypes.object,
  success: PropTypes.boolean,
  error: PropTypes.string
};

function mapStateToProps(state) {
  return {
    web3: state.web3,
    values: state.createBiffel.values,
    error: state.createBiffel.error,
    success: state.createBiffel.success
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createBiffel: bindActionCreators(createBiffel, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SellItem);
