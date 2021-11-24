import { SET_USER_TOKEN } from './user.types';

export const setUserToken = (data) => {
    return {
        type: SET_USER_TOKEN,
        payload: data
    };
};