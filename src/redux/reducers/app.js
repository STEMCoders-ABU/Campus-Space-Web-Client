import * as constants from '../actions/constants';

const initialState = {
    isLogout: false,
    faculties: constants.flags.INITIAL_VALUE,
    departments: constants.flags.INITIAL_VALUE,
    levels: constants.flags.INITIAL_VALUE,
    resources: constants.flags.INITIAL_VALUE,
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

    else if (action.type === constants.app.GET_RESOURCES) {
        const newState = {...state};
        newState.resources = action.payload;

        return newState;
    }
    
    return state;
};