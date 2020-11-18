import { axios } from "../../init";

const { createSlice } = require("@reduxjs/toolkit");

const constants = {

};

const initialState = {
    loggedIn: false,
    logoutUri: '',
    faculties: [],
};

export const getFaculties = () => {
    return (dispatch) => {
        return axios.get('faculties')
            .then(response => {
                if (response.status === 200) {
                    dispatch({ type: 'app/getFacultiesSuccess', payload: response.data });
                }
            });
    };
};

const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.loggedIn = true;
            state.logoutUri = action.payload;
        },
        getFacultiesSucces: (state, action) => {
            state.faculties = action.payload;
        },
    },
});

export default appSlice;