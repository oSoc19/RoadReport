import React from 'react';
import Main from './app/Main.js';

import EStyleSheet from 'react-native-extended-stylesheet';

export default class App extends React.Component {
  render() {
    return (
      <Main/>
    );
  }
}

EStyleSheet.build({ // always call EStyleSheet.build() even if you don't use global variables!
  $textColor: '#0275d8'
});
