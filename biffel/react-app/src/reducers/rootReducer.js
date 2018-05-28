import {combineReducers} from 'redux';
import itemReducer from './itemReducer';
import catalogReducer from './catalogReducer';
import userReducer from './userReducer';
import web3Reducer from './web3Reducer';

const rootReducer = combineReducers({
  item: itemReducer,
  items: catalogReducer,
  web3: web3Reducer
});

export default rootReducer;
