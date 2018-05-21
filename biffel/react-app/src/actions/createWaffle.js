import {CREATE_WAFFLE} from './actionTypes';
//import api from '../api.js'

export default function createWaffle(title, slotPrice, numberOfSlots) {
  return dispatch => {
    return fetch('/createWaffle', {
      body: JSON.stringify({slotPrice, numberOfSlots}),
      method: 'POST',
    })
    .then(response => response.json())
    .then(res => {
      console.log(res);
    })
    .catch(console.error)
  }
}

// return api.createWaffle(title, slotPrice, numberOfSlots)
// .then(resp => console.log(resp))
// .then(() => dispatch({type: CREATE_WAFFLE, item: {title, slotPrice, numberOfSlots}}))
