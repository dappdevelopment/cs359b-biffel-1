import initialState from './initialState';
import {USER_LOGIN_ATTEMPT, USER_LOGIN_FAILURE, USER_LOGIN_SUCCESS} from '../actions/actionTypes';

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case USER_LOGIN_ATTEMPT:
      return state;
    case USER_LOGIN_FAILURE:
      return {...state, userAttemptedLogin: true};
    case USER_LOGIN_SUCCESS:
      return {...state, userAttemptedLogin: true, ...action.user}
    default:
      return state;
  }
}
