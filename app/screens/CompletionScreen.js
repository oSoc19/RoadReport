import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image} from 'react-native'

//modules
import EStyleSheet from 'react-native-extended-stylesheet';
import { Actions } from 'react-native-router-flux';

class CompletionScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image resizeMode='contain' style={styles.gif} source={require('../assets/succes.gif')} />
                <Text style={styles.message}>Thanks for reporting! We will analyse your submission and take action accordingly.</Text>
                <TouchableOpacity  onPress={() => {Actions.welcome()}} style={styles.submitButton}>
                    <Text style={styles.buttonText}>Finish</Text>
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