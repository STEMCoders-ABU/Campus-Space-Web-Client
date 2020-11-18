import * as constants from '../actions/constants';

const initialState = {
    isLogout: false,
    faculties: [],
};

export const appReducer = (state = initialState, action) => {
    if (action.type === constants.app.GET_FACULTIES_SUCESS) {
        const newState = {...state};
        newState.faculties = action.payload;

        return newState;
    }
    
    return state;
};