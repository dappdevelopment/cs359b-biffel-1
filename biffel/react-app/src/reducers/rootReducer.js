import {combineReducers} from 'redux';
import itemReducer from './itemReducer';
import catalogReducer from './catalogReducer';
import web3Reducer from './web3Reducer';
import createBiffelReducer from './createBiffelReducer';

const rootReducer = combineReducers({
  item: itemReducer,
  items: catalogReducer,
  web3: web3Reducer,
  createBiffel: createBiffelReducer

});

export default rootReducer;
