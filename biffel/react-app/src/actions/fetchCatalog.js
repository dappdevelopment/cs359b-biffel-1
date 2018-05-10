import receiveCatalog from './receiveCatalog'
import api from '../api.js'

export default function fetchCatalog() {
  return dispatch => {
    //eventually this will be a database call.
    return dispatch(receiveCatalog(api.all()));
  };
}
