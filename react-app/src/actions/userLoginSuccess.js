import {USER_LOGIN_SUCCESS} from './actionTypes';

export default function userLoginSuccess(user) {
  return {type: USER_LOGIN_SUCCESS, user: user};
}
