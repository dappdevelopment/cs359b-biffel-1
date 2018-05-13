import userLoginFailure from './userLoginFailure'
import userLoginSuccess from './userLoginSuccess'
import api from '../api.js'

export default function userLogin(username, password) {
  return dispatch => {
    //eventually this will be a database call.
    var user = api.findUser(username, password)
    if(user === undefined){
      return dispatch(userLoginFailure())
    }
    return dispatch(userLoginSuccess(user))
  };
}
