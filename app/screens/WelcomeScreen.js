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
                <Text style={styles.title}>ROAD AID</Text>
                <Text style={styles.message}>Is there something wrong with the bicycle lane or the sidewalk? </Text>
                <Text style={styles.message}>Tell us! We will look at your report and take action accordingly.</Text>
                <TouchableOpacity onPress={() => {Actions.home()}} style={styles.submitButton}>
                    <Text style={styles.buttonText}>Report a problem</Text>
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
        color: '#0F0F0F'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        height: '12%',
        backgroundColor: '#70D090'
    },
    heading: {
        paddingTop: '7%',
        fontSize: 24,
        color: 'white'
    },
    textInput: {
        marginTop: 6,
        borderBottomWidth: 0.4,
        borderColor: '#0A0A0A',
        borderRadius: 6,
        height: 40,
        width: '100%',
        paddingBottom: 6,
        fontSize: 16,
    },
    streetInput: {
        borderBottomWidth: 0.4,
        borderColor: '#0A0A0A',
        borderRadius: 6,
        height: 40,
        width: '74%',
        paddingBottom: 6,
        fontSize: 16,
    },
    numberInput: {
        borderBottomWidth: 0.4,
        borderColor: '#0A0A0A',
        borderRadius: 6,
        height: 40,
        width: '24%',
        paddingBottom: 6,
        fontSize: 16,
    },
    submitButton: {
        position: 'absolute',
        width: '90%',
        height: 60,
        borderRadius: 6,
        backgroundColor: '#70D090', 
        top: '46%',
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 24,
        color: 'white'
    },
    label: {
        fontSize: 20,     },
    gif: {
        width: '80%',
    },
    message: {
        fontSize: 20,
        width: '90%',
        textAlign: 'center',
        marginTop: 20,
    },
    title: {
        fontSize: 44,
        width: '90%',
        textAlign: 'center',
        marginTop: 60,
    }

});

export default WelcomeScreen