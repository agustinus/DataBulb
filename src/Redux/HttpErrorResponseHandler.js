import Config from '../Config';

//override console
const _console = {
  info: function(message, obj) {
    Config.logReduxState && console.log(message, obj);
  },
  log: function(message, obj) {
    Config.logReduxState && console.info(message, obj);
  },
  // warn: function(message, obj) {
  //   Config.logReduxState && console.warn(message, obj);
  // },
};

/**
 * Http response state error handler
 */
const httpResponseErrorHandler = store => next => action => {
  _console.info('dispatching', action);
  let result = null;

  if (action.error) {
    if (action.error.status) {
      switch (action.error.status) {
        // To handle each status in different way, put the handle here
        case 400:
        case 401:
        case 500:
          result = Promise.reject(next(action).error);
          break;
        default:
          result = Promise.reject(next(action).error);
          break;
      }
    } else if (action.error.message === 'Network request failed') {
      result = Promise.reject(next(action).error);
    }
  } else {
    result = next(action);
  }

  _console.log('next state', store.getState());
  return result;
};

export default httpResponseErrorHandler;
