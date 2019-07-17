import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image} from 'react-native'

//modules
import EStyleSheet from 'react-native-extended-stylesheet';
import { Actions } from 'react-native-router-flux';
import LottieView from 'lottie-react-native';

class WelcomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <LottieView style={{
                    flex:1,
                    zIndex: 0,
                    }}
                    source={require('../assets/animations/intro.json')} 
                    resizeMode="contain"
                    autoPlay 
                    loop 
                />

                <Text style={styles.title}>ROAD REPORT</Text>

    
                <TouchableOpacity onPress={() => {Actions.home()}} style={styles.submitButton}>
                    <Text style={styles.buttonText}>Meld een Probleem</Text>
                </TouchableOpacity>

                <View style={{width: '70%', alignItems: 'center'}}>
                    <Text style={styles.message}>Ondervond u een probleem met een voet- of fietspad?</Text>
                    <Text style={styles.message}>Meld het! We zullen dit nakijken en actie ondernemen indien nodig.</Text>
                </View>

            </View>
        );
    }
}

const styles = EStyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#FFF',
    },
    submitButton: {
        marginTop: 230,
        width: '90%',
        height: 60,
        borderRadius: 6,
        backgroundColor: '#2594d9', 
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'center',
        borderRadius: 30,
    },
    buttonText: {
        fontSize: 24,
        color: 'white',
        fontFamily: '$openSansBold',
    },
    label: {
        fontSize: 20,     },
    gif: {
        width: '80%',
    },
    message: {
        fontSize: 16,
        width: '90%',
        textAlign: 'center',
        marginTop: 20,
        color: 'white',
        fontFamily: '$openSansRegular',
    },
    title: {
        fontSize: 44,
        width: '90%',
        textAlign: 'center',
        marginTop: 60,
        fontFamily: '$openSansExtrabold',
        color: 'white',
    }

});

export default WelcomeScreen