import {CREATE_WAFFLE} from './actionTypes';
import api from '../api.js'

export default function createWaffle(title, slotPrice, numberOfSlots) {
  // api.createWaffle(title, slotPrice, numberOfSlots)
  // return {type: CREATE_WAFFLE, item: {title, slotPrice, numberOfSlots}}
  return dispatch => {
    return api.createWaffle(title, slotPrice, numberOfSlots)
    .then(resp => console.log(resp))
    .then(() => dispatch({type: CREATE_WAFFLE, item: {title, slotPrice, numberOfSlots}}))
    .catch(console.error)
  }
}
