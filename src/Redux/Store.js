import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import ReduxRoot from './ReduxRoot.js';
import sagaRoot from './SagaRoot.js';
import HttpResponseErrorHandler from './HttpErrorResponseHandler';

let Store = null;

if (!Store) {
  const sagaMiddleware = createSagaMiddleware();
  Store = createStore(
    ReduxRoot.Reducer,
    applyMiddleware(sagaMiddleware, HttpResponseErrorHandler),
  );
  sagaMiddleware.run(sagaRoot);
}

export default Store;
