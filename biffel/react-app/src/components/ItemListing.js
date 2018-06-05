import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Panel, Table} from 'react-bootstrap';

// The FullRoster iterates over all of the players and creates
// a link to their profile page.

class ItemListing extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <ul>
          {this.props.items ?
            this.props.items.map(i => {
              if(i.isActive){
                return (
                  <li key={i.id}>
                    <Panel>
                      <Panel.Heading>
                        <Panel.Title componentClass="h3">
                          <Link to={`/buy/${i.id}`}>{i.title}</Link>
                        </Panel.Title>
                      </Panel.Heading>
                      <Panel.Body>
                        <p>Seller: {i.seller}</p>
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
                              <th>{i.slotPrice}</th>
                              <th>{i.slotCount}</th>
                              <th>{i.slotCount - i.buyers.length}</th>
                            </tr>
                          </tbody>
                        </Table>

                        {this.props.web3.userAccount !== i.seller ?
                          (
                            <div>
                              <Panel>
                                <Panel.Heading>
                                  <Panel.Title componentClass="h2">{'Slots Owned'}</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body>{getSlotsOwned(i.buyers, this.props.web3.userAccount)}</Panel.Body>
                              </Panel>
                            </div>
                          )
                        :
                          (
                            <h3> You Own This Biffel </h3>
                          )
                        }
                      </Panel.Body>
                    </Panel>
                  </li>
                )
              return null;
            }
            })
          :
            null
          }
        </ul>
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
