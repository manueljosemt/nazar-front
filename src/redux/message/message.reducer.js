import { SET_MESSAGE } from "./message.types";
import { REMOVE_MESSAGE } from "./message.types";

const INITIAL_STATE = {
  showMessage: false,
  message: "",
  typeMessage: ""
};

const messageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        showMessage: action.payload.showMessage,
        message: action.payload.message,
        typeMessage: action.payload.typeMessage,
      };
    case REMOVE_MESSAGE:
      return {
        ...state,
        showMessage: false,
        message: "",
        typeMessage: "",
      }
    default:
      return state;
  }
};

export default messageReducer;
