import receiveCatalog from './receiveCatalog'
import api from '../api.js'

export default function fetchCatalog(web3) {
  return dispatch => {
    //eventually this will be a database call.
    // return dispatch(receiveCatalog(api.all()));
    web3
  };
}

//getBiffelCount() ->  Number

//iterate over the numbers

// function getBiffelSeller(uint256 _biffelID) public view returns (address seller){
//         return biffels[_biffelID].seller;
//     }
//
//     function getBiffelBuyers(uint256 _biffelID) public view returns (address[] buyers){
//         return biffels[_biffelID].buyers;
//     }
//
//     function getBiffelBuyerLength(uint256 _biffelID) public view returns (uint buyerLength){
//         return biffels[_biffelID].buyers.length;
//     }
//
//     function getBiffelSlotCount(uint256 _biffelID) public view returns (uint32 slotCount){
//         return biffels[_biffelID].slotCount;
//     }
//
//     function getBiffelSlotPrice(uint256 _biffelID) public view returns (uint256 slotPrice){
//         return biffels[_biffelID].slotPrice;
//     }
//
//     function getBiffelBalance(uint256 _biffelID) public view returns (uint256 balance){
//         return biffels[_biffelID].balance;
//     }
//
//     function getBiffelBounty(uint256 _biffelID) public view returns (uint256 bounty){
//         return biffels[_biffelID].bounty;
//     }
//
//     function getBiffelStartBlock(uint256 _biffelID) public view returns (uint startBlock){
//         return biffels[_biffelID].startBlock;
//     }
//
//     function getBiffelBountyPaid(uint256 _biffelID) public view returns (bool bountyPaid){
//         return biffels[_biffelID].bountyPaid;
//     }
//
//     function getBiffelIsActive(uint256 _biffelID) public view returns (bool isActive){
//         return biffels[_biffelID].isActive;
//     }
