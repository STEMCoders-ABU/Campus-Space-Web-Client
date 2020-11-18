import appSlice from "./slices/app-slice";

const { getDefaultMiddleware, configureStore } = require("@reduxjs/toolkit");

const middleware = [
    ...getDefaultMiddleware(),
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
];

const reduxStore = configureStore({
    reducer: {
        app: appSlice.reducer,
    },
    middleware,
});

export default reduxStore;