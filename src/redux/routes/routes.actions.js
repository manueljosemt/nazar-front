import { SET_ROUTES } from "./routes.types";

export const setRoutes = (data) => {
  return {
    type: SET_ROUTES,
    payload: data,
  };
};
