import {BUY_SLOT_SUCCESS, BUY_SLOT_FAILED} from './actionTypes';

export default function buySlot(contract, userAccount, biffelID, value) {
  return dispatch => {
    contract.methods.buySlot(biffelID).send({from: userAccount, value})
    .then((res) => {
      console.log('res', res);
      dispatch({type: BUY_SLOT_SUCCESS});
    })
    .catch(err => {
      dispatch({type: BUY_SLOT_FAILED, error: err})
    })
  }
}
