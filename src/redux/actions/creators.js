import { axios } from '../../init';
import * as constants from './constants';

export const app = {
    logout: () => ({type: constants.app.LOGOUT}),

    getFaculties: () => {
        return (dispatch) => {
            return axios.get('faculties')
                .then(response => {
                    if (response.status === 200)
                        dispatch({ type: constants.app.GET_FACULTIES_SUCESS, payload: response.data });
                })
                .catch(() => {});
        };
    },
};

export const user = {
    getAccount: () => {
        return (dispatch) => {
            return axios.get('user/account')
                .then((response) => {
                    if (response.status === 200) {
                        // Positive response
                        // Dispatch a success action
                        dispatch({type: constants.user.GET_ACCOUNT_SUCCESSFUL, payload: response.data});
                    }
                    else if (response.status === 401) {
                        // The user is no longer authorized!
                        // We have to logout immediately
                        dispatch({type: constants.app.LOGOUT});
                    }
                    else {
                        // An error occured
                        dispatch({type: constants.user.GET_ACCOUNT_FAILED});
                    }
                })
                .catch(() => {
                    // An error occured
                    dispatch({type: constants.user.GET_ACCOUNT_FAILED});
                });
        }
    },

    getGroupInfo: () => {
        return (dispatch) => {
            return axios.get('user/group/info')
                .then((response) => {
                    if (response.status === 200) {
                        // Positive response
                        // Dispatch a success action
                        dispatch({type: constants.user.GET_GROUP_INFO_SUCCESSFUL, payload: response.data});
                    }
                    else if (response.status === 404) {
                        // This user has no group
                        dispatch({type: constants.user.GET_GROUP_INFO_NOT_FOUND});
                    }
                    else if (response.status === 401) {
                        // The user is no longer authorized!
                        // We have to logout immediately
                        dispatch({type: constants.app.LOGOUT});
                    }
                    else {
                        // An error occured
                        dispatch({type: constants.user.GET_GROUP_INFO_FAILED});
                    }
                })
                .catch(() => {
                    // An error occured
                    dispatch({type: constants.user.GET_GROUP_INFO_FAILED});
                });
        }
    },
};