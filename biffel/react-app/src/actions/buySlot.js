import {BUY_SLOT_SUCCESS, BUY_SLOT_FAILED} from './actionTypes';

export default function buySlot(web3, biffelID) {
  return dispatch => {
    web3.contract.methods.buySlot(biffelID).send({from: web3.userAccount})
    .then((res) => {
      console.log('res', res);
      dispatch({type: BUY_SLOT_SUCCESS});
    })
    .catch(err => {
      dispatch({type: BUY_SLOT_FAILED, error: err})
    })
  }
}
