import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import auth from "./auth";
import flashMessages from "./flashMessages";
import searchResult from "./searchResult";
import searchListings from "./searchListings";
import service from './service';
import shopServiceSettings from './shopServiceSettings';

export default combineReducers({
  auth,
  flashMessages,
  searchResult,
  searchListings,
  form: formReducer,
  service,
  shopServiceSettings
});
