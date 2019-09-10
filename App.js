/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {Provider} from 'react-redux';
import Store from './src/Redux/Store';

import MobileDataScreen from './src/Screens/MobileDataScreen';

const App = () => {
  return (
    <Fragment>
      <Provider store={Store}>
        <MobileDataScreen />
      </Provider>
    </Fragment>
  );
};

export default App;
