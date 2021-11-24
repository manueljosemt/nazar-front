import { SET_USER_TOKEN } from './user.types';

const INITIAL_STATE = {
    token: null,
    name: null
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USER_TOKEN:
           return {
             ...state, 
             token: action.payload.token,
             name: action.payload.name,
           };
        default: return state;
    }
};

export default userReducer;