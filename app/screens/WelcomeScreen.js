import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image} from 'react-native'

//modules
import EStyleSheet from 'react-native-extended-stylesheet';
import { Actions } from 'react-native-router-flux';

class WelcomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>ROAD REPORT</Text>
    
                <TouchableOpacity onPress={() => {Actions.home()}} style={styles.submitButton}>
                    <Text style={styles.buttonText}>Report a problem</Text>
                </TouchableOpacity>

                <View style={{width: '100%', alignItems: 'center'}}>
                    <Text style={styles.message}>Is there something wrong with the bicycle lane or the sidewalk? </Text>
                    <Text style={styles.message}>Tell us! We will look at your report and take action accordingly.</Text>
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
        backgroundColor: '#2594d9',
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
        fontFamily: '$openSansBold',
        color: 'white',
    }

});

export default WelcomeScreen