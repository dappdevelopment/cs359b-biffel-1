import {CREATE_BIFFEL_SUCCESS, CREATE_BIFFEL_FAILED} from './actionTypes';

export default function createBiffel(contract, userAccount, values) {
  return dispatch => {
    contract.methods.createBiffel(values.title, values.ipfsHash, values.numberOfSlots, values.slotPrice, values.bounty).send({from: userAccount})
    .then((res) => {
      console.log('res', res);
      dispatch({type: CREATE_BIFFEL_SUCCESS});
    })
    .catch(err => {
      dispatch({type: CREATE_BIFFEL_FAILED, error: err})
    })
  }
}
