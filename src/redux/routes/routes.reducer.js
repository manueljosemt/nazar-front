import { SET_ROUTES } from "./routes.types";

const INITIAL_STATE = {
  routes: [],
};

const routesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ROUTES:
      return {
        ...state,
        routes: action.payload.routes,
      };
    default:
      return state;
  }
};

export default routesReducer;
