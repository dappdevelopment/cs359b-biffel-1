import {START_BIFFEL_SUCCESS, START_BIFFEL_FAILED} from './actionTypes';

export default function initiateBiffel(web3, biffelID) {
  return dispatch => {
    web3.contract.methods.startBiffel(biffelID).send({from: web3.userAccount})
    .then((res) => {
      console.log('res', res);
      dispatch({type: START_BIFFEL_SUCCESS});
    })
    .catch(err => {
      dispatch({type: START_BIFFEL_FAILED, error: err})
    })
  }
}
