import { TOGGLE_LOADER } from './loader.types';

export const toggleLoader = (data) => {
    return {
        type: TOGGLE_LOADER,
        payload: data
    };
};