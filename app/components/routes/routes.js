//React imports
import React, { Component } from 'react'
import {Router, Scene} from 'react-native-router-flux'

//Local imports
import HomeScreen from '../../screens/HomeScreen'
import CompletionScreen from '../../screens/CompletionScreen'
import WelcomeScreen from '../../screens/WelcomeScreen'

export default class Routes extends Component {
	constructor(props){
		super(props)
		this.state = {
		}
    }

	render() {
        return(
            <Router>
                <Scene key="root" hideNavBar>
                    <Scene key="welcome" component={WelcomeScreen} title="Welcome" initial={true} />
                    <Scene key="home" component={HomeScreen} title="Home" />
                    <Scene key="completed" component={CompletionScreen} title="Completed" />
                </Scene>
            </Router>
        )
    }
}