import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Panel, Table} from 'react-bootstrap';
import './ItemListing.css'

// The FullRoster iterates over all of the players and creates
// a link to their profile page.

class ItemListing extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
          {this.props.items ?
            this.props.items.map(i => {
              if(i.isActive && i.seller !== this.props.web3.userAccount){
                return (
                  <Link to={`/buy/${i.id}`} style={{ textDecoration: 'none' }}>
                    <Panel bsStyle="info">
                      <Panel.Heading>
                        <Panel.Title componentClass="h3">
                          <h3>{i.title}</h3>
                        </Panel.Title>
                      </Panel.Heading>
                      <Panel.Body>

                        {this.props.userAccount !== i.seller ?
                          (
                            <p>Seller: {i.seller}</p>
                          )
                        :
                          (
                            <p>Seller: You</p>
                          )
                        }

                        <Table>
                          <thead>
                            <tr>
                              <th>Slot Price</th>
                              <th>Initial Slot Count</th>
                              <th>Slots Remaining</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th>{i.slotPrice} wei</th>
                              <th>{i.slotCount}</th>
                              <th>{i.slotCount - i.buyers.length}</th>
                            </tr>
                          </tbody>
                        </Table>

                        {this.props.userAccount !== i.seller ?
                          (
                            <div>
                              <Panel bsStyle="info">
                                <Panel.Heading>
                                  <Panel.Title componentClass="h2">{'Slots Owned'}</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body>{getSlotsOwned(i.buyers, this.props.userAccount)}</Panel.Body>
                              </Panel>
                            </div>
                          )
                        :
                          null
                        }
                      </Panel.Body>
                    </Panel>
                  </Link>
                )
              return null;
            }
            })
          :
            null
          }
      </div>
  );
  }
}
// const ItemListing = (props) => {
//   if(props.items === null){
//     return null;
//   }
//   return (
//     <div>
//       <ul>
//         {props.items ?
//           props.items.map(i => (
//             <li key={i.id}>
//               <Panel>
//               <Panel.Heading>
//                 <Panel.Title componentClass="h3">
//                   <Link to={`/buy/${i.id}`}>{i.title}</Link>
//                 </Panel.Title>
//                 <Panel.Body>
//                   <div>
//                     {i.seller}
//                   </div>
//                   <div>
//                     {i.slotCount - i.buyers.length}
//                   </div>
//                 </Panel.Body>
//               </Panel.Heading>
//               </Panel>
//             </li>
//           ))
//           :
//           null
//         }
//       </ul>
//     </div>
//   )
// }

function getSlotsOwned(buyers, myAccount){
  var count = 0;
  for(let buyer of buyers){
    if(buyer === myAccount){
      count += 1;
    }
  }
  return count;
}

ItemListing.propTypes = {
  items: PropTypes.array,
  userAccount: PropTypes.string
};

function mapStateToProps(state) {
  return {
    items: state.items,
    userAccount: state.web3.userAccount
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
