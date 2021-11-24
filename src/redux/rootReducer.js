import { combineReducers } from "redux";
import loaderReducer from "./loader/loader.reducer"
import userReducer from "./user/user.reducer"

const rootReducer = combineReducers({
  loader: loaderReducer,
  user: userReducer
});

export default rootReducer;
