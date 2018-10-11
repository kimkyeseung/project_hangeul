import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './container/AppContainer';
import { Provider } from 'react-redux';
import reducer from './reducer';
import { ConnectedRouter, connectRouter, routerMiddleware, push } from 'connected-react-router';
import { createStore, compose, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { createBrowserHistory } from 'history';
import * as serviceWorker from './serviceWorker';

const history = createBrowserHistory();

const store = createStore(connectRouter(history)(reducer), compose(applyMiddleware(logger, routerMiddleware(history))));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'));

serviceWorker.unregister();
