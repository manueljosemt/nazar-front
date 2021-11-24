import { TOGGLE_LOADER } from './loader.types';

const INITIAL_STATE = {
    loader: false,
};

const loaderReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOGGLE_LOADER:
           return {
             ...state, loader: !state.loader,
           };
        default: return state;
    }
};

export default loaderReducer;