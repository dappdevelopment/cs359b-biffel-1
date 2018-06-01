import {BUY_SLOT_SUCCESS, BUY_SLOT_FAILED} from './actionTypes';

export default function buySlot(values, web3) {
  return dispatch => {
    web3.contract.methods.buySlot(values.biffelID).send({from: web3.userAccount})
    .then((res) => {
      console.log('res', res);
      dispatch({type: BUY_SLOT_SUCCESS});
    })
    .catch(err => {
      dispatch({type: BUY_SLOT_FAILED, error: err})
    })
  }
}