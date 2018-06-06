import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Panel, Table, Thumbnail, Image} from 'react-bootstrap';
import './ItemListing.css'

// The FullRoster iterates over all of the players and creates
// a link to their profile page.

class ItemListing extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="flexBox">
          {this.props.items ?
            this.props.items.map(i => {
              if(i.isActive && i.seller !== this.props.userAccount){
                return (
                  <div className="flexItem">
                    <Link to={`/buy/${i.id}`} style={{ textDecoration: 'none' }}>
                      <div className="imgContainer" >
                        <Image className="itemImg" src={"https://ipfs.io/ipfs/" + i.ipfsHash} responsive/>
                      </div>
                      <h3 className="title">{i.title}</h3>
                      <Table>
                        <thead>
                          <tr>
                            <th>Slot Price</th>
                            <th>Slots Remaining</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>{i.slotPrice} wei</th>
                            <th>{i.slotCount - i.buyers.length}</th>
                          </tr>
                        </tbody>
                      </Table>
                    </Link>
                  </div>
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
