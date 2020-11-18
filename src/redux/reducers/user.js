import * as constants from '../actions/constants';

const initialState = {
    account: constants.flags.INITIAL_VALUE,
    groupInfo: constants.flags.INITIAL_VALUE,
};

export const userReducer = (state = initialState, action) => {
    if (action.type === constants.user.GET_ACCOUNT_SUCCESSFUL) {
        const newState = {...state};
        newState.account = action.payload;

        return newState;
    }

    if (action.type === constants.user.GET_ACCOUNT_FAILED) {
        const newState = {...state};
        newState.account = constants.flags.ERROR;

        return newState;
    }

    if (action.type === constants.user.GET_GROUP_INFO_SUCCESSFUL) {
        const newState = {...state};
        newState.groupInfo = action.payload;

        return newState;
    }

    if (action.type === constants.user.GET_GROUP_INFO_FAILED) {
        const newState = {...state};
        newState.groupInfo = constants.flags.ERROR;

        return newState;
    }

    if (action.type === constants.user.GET_GROUP_INFO_NOT_FOUND) {
        const newState = {...state};
        newState.groupInfo = constants.flags.NOT_FOUND;

        return newState;
    }

    return state;
};