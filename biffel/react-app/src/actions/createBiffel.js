import {CREATE_BIFFEL} from './actionTypes';

export default function createBiffel(title, slotPrice, numberOfSlots) {
  //do shit here.
  return {type: CREATE_BIFFEL, item: {title, slotPrice, numberOfSlots}};
}
