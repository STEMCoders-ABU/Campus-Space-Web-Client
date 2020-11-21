import * as constants from '../actions/constants';

const initialState = {
    isLogout: false,
    faculties: constants.flags.INITIAL_VALUE,
    departments: constants.flags.INITIAL_VALUE,
    levels: constants.flags.INITIAL_VALUE,
    categories: constants.flags.INITIAL_VALUE,
    fetchDepartmentsSignal: 0,
    auth: {
        authenticated: false,
        logout: '',
    },
};

// Check for any session data
if (sessionStorage.getItem('auth')) {
    initialState.auth = JSON.parse(sessionStorage.getItem('auth'));
}

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

    else if (action.type === constants.app.GET_CATEGORIES_SUCCESS) {
        const newState = {...state};
        newState.categories = action.payload;

        return newState;
    }
    
    else if (action.type === constants.app.AUTHENTICATE) {
        const newState = {...state};
        newState.auth = {...action.payload};

        // store the data in session (this caches the data in case the user refreshes the window)
        sessionStorage.setItem('auth', JSON.stringify(newState.auth));
        return newState;
    }

    else if (action.type === constants.app.SIGNAL_FETCH_DEPARTMENTS) {
        const newState = {...state};
        newState.fetchDepartmentsSignal = Math.random() * new Date().getSeconds();

        return newState;
    }
    
    return state;
};