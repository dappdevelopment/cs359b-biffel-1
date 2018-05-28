import userLoginFailure from './userLoginFailure'
import userLoginSuccess from './userLoginSuccess'

export default function userLogin(email, password) {
  var values = {email, password}
  return dispatch => {
    return fetch('/login', {
      body: JSON.stringify(values),
      method: 'POST',
    })
    .then(response => response.json())
    .then(res => {
      if(res.name){
        return dispatch(userLoginSuccess(res));
      }
      return dispatch(userLoginFailure(res.error || 'Incorrect email or password'));
    })
  }
}
