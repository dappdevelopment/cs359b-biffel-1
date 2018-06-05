import React, { Component } from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import {Panel} from 'react-bootstrap';

// The Player looks up the player using the number parsed from
// the URL's pathname. If no player is found with the given
// number, then a "player not found" message is displayed.

class Profile extends Component {
  constructor(props){
    super(props);
  }

  render (){

    var activeBiffelsUserSeller = getActiveBiffelsUserSeller(this.props.items, this.props.web3.userAccount);
    var activeBiffelsUserBuyer = getActiveBiffelsUserBuyer(this.props.items, this.props.web3.userAccount);

    var inactiveBiffelsUserSeller = getInactiveBiffelsUserSeller(this.props.items, this.props.web3.userAccount);
    var inactiveBiffelsUserBuyer = getInactiveBiffelsUserBuyer(this.props.items, this.props.web3.userAccount);

    // console.log('ActiveBiffelsUserSeller', getActiveBiffelsUserSeller(this.props.items, this.props.web3.userAccount));
    // console.log('ActiveBiffelsUserBuyer', getBiffelsUserBuyer(this.props.items, this.props.web3.userAccount));

    // console.log('InactiveBiffelsUserSeller', getInactiveBiffelsUserSeller(this.props.items, this.props.web3.userAccount));
    // console.log('InactiveBiffelsUserBuyer', getInactiveBiffelsUserBuyer(this.props.items, this.props.web3.userAccount));

    return (
      <div>
        <Panel>
          <Panel.Heading>
            <Panel.Title componentClass="h3">Your Ethereum Address</Panel.Title>
          </Panel.Heading>
          <Panel.Body>{this.props.web3.userAccount}</Panel.Body>
        </Panel>

        <Panel>
          <Panel.Heading>
            <Panel.Title componentClass="h3">Your Active Biffels</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            {activeBiffelsUserSeller ?
              activeBiffelsUserSeller.map(i => {
                return(
                  <Panel>
                    <Panel.Heading>
                      <Link to={`/buy/${i.id}`}>{i.title}</Link>
                    </Panel.Heading>
                  </Panel>
                )
              })
            :
              null
            }
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Heading>
            <Panel.Title componentClass="h3">Your Active Bids</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            {activeBiffelsUserBuyer ?
              activeBiffelsUserBuyer.map(i => {
                return(
                  <Panel>
                    <Panel.Heading>
                      <Link to={`/buy/${i.id}`}>{i.title}</Link>
                    </Panel.Heading>
                  </Panel>
                )
              })
            :
              null
            }
          </Panel.Body>
        </Panel>

      </div>
    )


  }
}

Profile.propTypes = {
  user: PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: state.user,
    items: state.items,
    web3: state.web3
  };
}

function getActiveBiffelsUserSeller(items, userAccount) {
  var biffelsUserSeller = [];
  for(var item in items){
    if(items[item].seller == userAccount){
      biffelsUserSeller.push(items[item]);
    }
  }
  return biffelsUserSeller;
}

function getInactiveBiffelsUserSeller(items, userAccount) {
  var biffelsUserSeller = [];
  for(var item in items){
    if(!items[item].isActive && items[item].seller == userAccount){
      biffelsUserSeller.push(items[item]);
    }
  }
  return biffelsUserSeller;
}

function getActiveBiffelsUserBuyer(items, userAccount) {
  var biffelsUserBuyer = [];
  for(var item in items){
    for(var buyer in items[item].buyers){
      if(items[item].buyers[buyer] === userAccount){
        biffelsUserBuyer.push(items[item]);
        break;
      }
    }
  }
  return biffelsUserBuyer;
}

function getInactiveBiffelsUserBuyer(items, userAccount) {
  var biffelsUserBuyer = [];
  for(var item in items){
    if(!items[item].isActive){
      continue;
    }
    for(var buyer in items[item].buyers){
      if(items[item].buyers[buyer] === userAccount){
        biffelsUserBuyer.push(items[item]);
        break;
      }
    }
  }
  return biffelsUserBuyer;
}

// function mapDispatchToProps(dispatch) {
//   return {
//     fetchItemDetails: bindActionCreators(fetchItemDetails, dispatch)
//   };
// }

export default connect(
  mapStateToProps,
  null
)(Profile);
