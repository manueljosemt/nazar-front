import { SET_MESSAGE } from "./message.types";
import { REMOVE_MESSAGE } from "./message.types";

export const setMessage = (data) => {
  return {
    type: SET_MESSAGE,
    payload: data,
  };
};

export const removeMessage = () => {
  return {
    type: REMOVE_MESSAGE
  };
};
