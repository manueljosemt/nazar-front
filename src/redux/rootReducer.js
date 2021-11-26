import { combineReducers } from "redux";
import loaderReducer from "./loader/loader.reducer";
import userReducer from "./user/user.reducer";
import routesReducer from "./routes/routes.reducer";
import messageReducer from "./message/message.reducer";

const rootReducer = combineReducers({
  loader: loaderReducer,
  user: userReducer,
  route: routesReducer,
  message: messageReducer
});

export default rootReducer;
