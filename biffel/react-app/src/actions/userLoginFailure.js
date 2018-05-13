import {USER_LOGIN_FAILURE} from './actionTypes';

export default function userLoginFailure(reason) {
  return {type: USER_LOGIN_FAILURE, reason: reason};
}
