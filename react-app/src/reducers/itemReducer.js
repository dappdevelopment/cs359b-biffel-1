import initialState from './initialState';
import {FETCH_ITEM_DETAILS, RECEIVE_ITEM_DETAILS} from '../actions/actionTypes';

export default function itemReducer(state = initialState.item, action) {
  switch (action.type) {
    case FETCH_ITEM_DETAILS:
      return state;
    case RECEIVE_ITEM_DETAILS:
      return action.item;
    default:
      return state;
  }
}
