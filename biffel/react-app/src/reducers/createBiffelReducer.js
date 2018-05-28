import initialState from './initialState';
import {INITIATE_CREATE_BIFFEL, CREATE_BIFFEL_SUCCESS, CREATE_BIFFEL_FAILED} from '../actions/actionTypes';

export default function createBiffelReducer(state = initialState.createBiffel, action) {
  switch (action.type) {
    case INITIATE_CREATE_BIFFEL:
      return initiateState.createBiffel;
    case CREATE_BIFFEL_SUCCESS:
      return {error: '', success: true};
    case CREATE_BIFFEL_FAILED:
      return {success: false, error: action.error};
    default:
      return state;
  }
}
