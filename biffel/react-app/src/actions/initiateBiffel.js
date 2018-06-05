import {START_BIFFEL_SUCCESS, START_BIFFEL_FAILED} from './actionTypes';

export default function initiateBiffel(contract, userAccount, biffelID) {
  return dispatch => {
    contract.methods.startBiffel(biffelID).send({from: userAccount})
    .then((res) => {
      console.log('res', res);
      dispatch({type: START_BIFFEL_SUCCESS});
    })
    .catch(err => {
      dispatch({type: START_BIFFEL_FAILED, error: err})
    })
  }
}
