import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer } from './reducers/root';
import thunk from 'redux-thunk';
import { IS_DEVELOPMENT_MODE } from '../init';

let store;
let storeEnhancers = compose;
if (IS_DEVELOPMENT_MODE) {
    storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configure = () => {
    if (store)
        return store;

    return createStore(
        rootReducer,
        {},
        storeEnhancers(applyMiddleware(thunk))
    );
};

export default configure;