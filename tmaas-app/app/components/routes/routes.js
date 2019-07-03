//React imports
import React, { Component } from 'react'
import {Router, Scene} from 'react-native-router-flux'

//Local imports
import HomeScreen from '../../screens/HomeScreen'

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
                    <Scene key="home" component={HomeScreen} title="Home" initial={true} />
                </Scene>
            </Router>
        )
    }
}