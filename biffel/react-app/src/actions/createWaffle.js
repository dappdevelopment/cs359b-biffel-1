import {CREATE_WAFFLE} from './actionTypes';

export default function createWaffle(title, slotPrice, numberOfSlots) {
  //do shit here.
  return {type: CREATE_WAFFLE, item: {title, slotPrice, numberOfSlots}};
}
