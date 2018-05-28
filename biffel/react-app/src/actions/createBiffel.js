import {CREATE_BIFFEL_SUCCESS, CREATE_BIFFEL_FAILED} from './actionTypes';

export default function createBiffel(values, web3) {
  return dispatch => {
    web3.contract.methods.createBiffel(values.numberOfSlots, values.slotPrice).send({from: web3.userAccount})
    .then((res) => {
      console.log('res', res);
      dispatch({type: CREATE_BIFFEL_SUCCESS});
    })
    .catch(err => {
      dispatch({type: CREATE_BIFFEL_FAILED, values, error: err})
    })
  }
}
