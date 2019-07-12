import React from 'react'
import Main from './app/Main.js'
import * as Font from 'expo-font'

import EStyleSheet from 'react-native-extended-stylesheet';

export default class App extends React.Component {
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'open-sans-bold': require('./app/assets/fonts/OpenSans/OpenSans-Bold.ttf'),
      'open-sans-regular': require('./app/assets/fonts/OpenSans/OpenSans-Regular.ttf'),
      'open-sans-semibold': require('./app/assets/fonts/OpenSans/OpenSans-SemiBold.ttf')
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      this.state.fontLoaded ? (
        <Main/>
      ) : null
    );
  }
}


EStyleSheet.build({ // always call EStyleSheet.build() even if you don't use global variables!
  $textColor: '#0275d8',
  $openSansBold: 'open-sans-bold',
  $openSansRegular: 'open-sans-regular',
  $openSansSemibold: 'open-sans-semibold',
})
