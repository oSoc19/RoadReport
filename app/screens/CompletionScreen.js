import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image} from 'react-native'

//modules
import EStyleSheet from 'react-native-extended-stylesheet';
import { Actions } from 'react-native-router-flux';
import LottieView from 'lottie-react-native';

class CompletionScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <LottieView style={{
                    zIndex: 0,
                    }}
                    source={require('../assets/animations/checkmark.json')} 
                    autoPlay 
                    loop={false}
                    speed={0.8} 
                />
                <Text style={styles.message}>Bedankt om dit probleem te melden! We zullen dit nakijken en gepaste actie ondernemen. </Text>
                <TouchableOpacity  onPress={() => {Actions.welcome()}} style={styles.submitButton}>
                    <Text style={styles.buttonText}>Einde</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = EStyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        color: '#0F0F0F',
        justifyContent: 'space-around'
    },
    submitButton: {
        width: '90%',
        height: 60,
        borderRadius: 6,
        backgroundColor: '#6CE077', 
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
        fontSize: 20, 
    },
    gif: {
        height: '40%',
    },
    message: {
        fontSize: 20,
        width: '90%',
        textAlign: 'center',
        marginBottom: 40,
        fontFamily: '$openSansRegular',
    },

});

export default CompletionScreen