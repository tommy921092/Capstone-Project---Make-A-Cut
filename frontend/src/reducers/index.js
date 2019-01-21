import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import auth from "./auth";
import flashMessages from "./flashMessages";

export default combineReducers({
  auth,
  flashMessages,
  form: formReducer
});
