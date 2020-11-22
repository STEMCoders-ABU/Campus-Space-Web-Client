import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import reduxStore from './redux/configure-store';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={reduxStore()}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();

//reportWebVitals();