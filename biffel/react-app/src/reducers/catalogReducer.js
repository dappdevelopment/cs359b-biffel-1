import initialState from './initialState';
import {FETCH_CATALOG, RECEIVE_CATALOG} from '../actions/actionTypes';

export default function catalogReducer(state = initialState.items, action) {
  switch (action.type) {
    case FETCH_CATALOG:
      return state;
    case RECEIVE_CATALOG:
      return action.items;
    default:
      return state;
  }
}
