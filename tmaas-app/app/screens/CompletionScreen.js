import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image} from 'react-native'

//modules
import EStyleSheet from 'react-native-extended-stylesheet';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={{width: 500, height: 500}} source={require('../assets/succes.gif')} />
            </View>
        );
    }
}

const styles = EStyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
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
    commentContainer: {
        paddingTop: '4%',
        flexDirection: 'column',
        alignSelf: 'center',
        justifyContent: 'space-between',
        width: '90%',
        marginBottom: 20,
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
        fontWeight: "700",
        color: 'white'
    },
    label: {
        fontSize: 20, 
        fontWeight: "700"
    }

});

export default HomeScreen