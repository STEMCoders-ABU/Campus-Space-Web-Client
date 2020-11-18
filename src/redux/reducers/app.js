import * as constants from '../actions/constants';

const initialState = {
    isLogout: false,
    faculties: [],
    departments: [],
    levels: [],
};

export const appReducer = (state = initialState, action) => {
    if (action.type === constants.app.GET_FACULTIES_SUCESS) {
        const newState = {...state};
        newState.faculties = action.payload;

        return newState;
    }

    else if (action.type === constants.app.GET_DEPARTMENTS_SUCCESS) {
        const newState = {...state};
        newState.departments = action.payload;

        return newState;
    }

    else if (action.type === constants.app.GET_LEVELS_SUCCESS) {
        const newState = {...state};
        newState.levels = action.payload;

        return newState;
    }
    
    return state;
};