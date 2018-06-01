import {combineReducers} from 'redux';
import itemsReducer from './itemsReducer';
import web3Reducer from './web3Reducer';
import createBiffelReducer from './createBiffelReducer';

const rootReducer = combineReducers({
  items: itemsReducer,
  web3: web3Reducer,
  createBiffel: createBiffelReducer

});

export default rootReducer;
