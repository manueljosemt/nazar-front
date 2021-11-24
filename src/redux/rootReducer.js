import { combineReducers } from "redux";
import loaderReducer from "./loader/loader.reducer";
import userReducer from "./user/user.reducer";
import routesReducer from "./routes/routes.reducer";

const rootReducer = combineReducers({
  loader: loaderReducer,
  user: userReducer,
  route: routesReducer,
});

export default rootReducer;
