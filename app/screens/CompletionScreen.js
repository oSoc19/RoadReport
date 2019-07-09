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
        fontWeight: "700",
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
        width: '90%',
        height: 60,
        borderRadius: 6,
        backgroundColor: '#70D090', 
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 24,
        color: 'white'
    },
    label: {
        fontSize: 20, 
    },
    gif: {
        width: '80%',
    },
    message: {
        fontSize: 24,
        width: '90%',
        textAlign: 'center',
        marginBottom: 40,
    },

});

export default CompletionScreen