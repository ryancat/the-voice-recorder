import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { combinedReducer } from './reducers';
import { createLogger } from 'redux-logger';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from './containers/AppContainer';
import { saga } from './sagas';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

const middleware = [];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

// add the saga middleware
const sagaMiddleware = createSagaMiddleware();
middleware.push(sagaMiddleware);

const store = createStore(
  combinedReducer,
  applyMiddleware(...middleware)
)

// Run saga
sagaMiddleware.run(saga);

render(
  <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
// Our PWA needs to be working offline
serviceWorker.register();