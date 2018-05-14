import userLoginFailure from './userLoginFailure'
import userLoginSuccess from './userLoginSuccess'
import api from '../api.js'

export default function userLogin(email, password) {
  return dispatch => {
    //eventually this will be a database call.
    var user = api.findUser(email, password)
    if(user === undefined){
      return dispatch(userLoginFailure('Incorrect email or password!'))
    }
    return dispatch(userLoginSuccess(user))
  };
}
