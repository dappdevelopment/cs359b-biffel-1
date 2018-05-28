import initialState from './initialState';
import {SETUP_CONNECTION_SUCCESS, SETUP_CONNECTION_FAILURE, SETUP_CONNECTION_LOADING} from '../actions/actionTypes';

export default function web3Reducer(state = initialState.web3, action) {
  switch (action.type) {
    case SETUP_CONNECTION_LOADING:
      return {...state, loading: true}
    case SETUP_CONNECTION_SUCCESS:
      return {...state, contract: action.web3.contract, userAccount: action.web3.userAccount, loading: false};
    case SETUP_CONNECTION_FAILURE:
      console.log('action', action);
      return {...state, error: action.error, loading: false};
    default:
      return state;
  }
}
