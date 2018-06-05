import initialState from './initialState';
import {INITIATE_BUY_SLOT, BUY_SLOT_SUCCESS, BUY_SLOT_FAILED} from '../actions/actionTypes';

export default function buySlotReducer(state = initialState.buySlot, action) {
  switch (action.type) {
    case INITIATE_BUY_SLOT:
      return {...initialState.buySlot, loading: true};
    case BUY_SLOT_SUCCESS:
      return {error: '', success: true, loading: false};
    case BUY_SLOT_FAILED:
      return {error: action.error, success: false, loading: false};
    default:
      return state;
  }
}
