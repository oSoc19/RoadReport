//React imports
import React from 'react'
import Routes from './components/routes/routes'

import {Localization} from './localization/Localization';
import en from './localization/en';
import nl from './localization/nl';

//import nl from './nl';
// Settings Language
Localization.init({
    dictionary: {
        nl: nl,
        en: en,
    },
    currentLocale: 'nl',
    fallbackLocale: 'en',
});

export default class Main extends React.Component {

  render() {
    return(
      <Routes />
    )
  }
}