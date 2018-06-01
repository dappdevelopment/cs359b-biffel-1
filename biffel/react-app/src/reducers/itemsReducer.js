import initialState from './initialState';
import {ITEMS_RECEIVED} from '../actions/actionTypes';

export default function itemsReducer(state = initialState.items, action) {
  switch (action.type) {
    case ITEMS_RECEIVED:
      return action.items
    default:
      return state;
  }
}
