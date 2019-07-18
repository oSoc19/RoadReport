import React, { Component } from 'react'
import { View, TextInput, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, Alert} from 'react-native'

//modules
import EStyleSheet from 'react-native-extended-stylesheet';
import {Actions} from 'react-native-router-flux'

class CommentScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: "",
            email: "",
            status: "",
            problem: "",
            street: "",
            number: "",
            city: "",
            category: "",
        }
    }

    postToApi = async() => {
        /*const url = "https://tmaas.m-leroy.pro/problem/send"

        if(this.state.problem == "" || this.state.street == "" || this.state.city == "" || this.state.street == "") {
            Alert.alert(
                'Alert',
                'Please fill in the required fields.',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                ],
                {cancelable: false},
              );
        }
        else {
            var data = {
                "report": {
                    "problem": this.state.problem,
                    "comment": this.state.comment,
                    "location": {
                        "street": this.state.street,
                        "number": this.state.number,
                        "city": this.state.city,
                    },
                }
            }
            
            await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(async(response) => await this.setState({
                status: response
            }))
            .then(console.log(this.state.status))
            .catch(error => console.error('Error:', error))*/
            Actions.completed()
        //}
    }

    goBack = () => {
        Actions.pop()
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.heading}>Report a problem</Text>
                    <Text style={styles.heading}>4/4</Text>
                </View>

                <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled keyboardVerticalOffset={0}> 
                    <ScrollView contentContainerStyle={{flex: 1, justifyContent: 'space-between'}}>
                        <View style={{flex: 1}}>
                            <View style={styles.commentContainer}>
                                <Text style={styles.label}>Heb je meer info over het probleem?</Text>
                                <TextInput
                                    placeholder = {"Beschrijf het probleem..."}
                                    onChangeText={(comment) => this.setState({comment})}
                                    value={this.state.comment}
                                    editable = {true}
                                    maxLength = {255}
                                    style={styles.textInput}
                                />
                            </View>
                            <View style={styles.commentContainer}>
                                <Text style={styles.label}>Laat je Email achter als je updates over het probleem wilt ontvangen</Text>
                                <TextInput
                                    placeholder = {"Email"}
                                    onChangeText={(email) => this.setState({email})}
                                    value={this.state.email}
                                    editable = {true}
                                    maxLength = {255}
                                    style={styles.textInput}
                                />
                            </View>
                        </View>
                    

                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: '5%', marginRight: '5%'}}>
                                <TouchableOpacity style={styles.backButton} onPress={this.goBack}>
                                    <Text style={styles.buttonText}>Back</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.submitButton} onPress={this.postToApi}>
                                    <Text style={styles.buttonText}>Verzend</Text>
                                </TouchableOpacity>
                            </View>

                </ScrollView>
                </KeyboardAvoidingView>

            </View>
        );
    }
}

const styles = EStyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        color: '#0F0F0F',
    },
    bottomContainer: {
        flexDirection: 'column',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '100%',
        height: '11%',
        backgroundColor: '#2594d9',
        paddingLeft: '5%',
        paddingRight: '5%'
    },
    commentContainer: {
        backgroundColor: 'white',
        marginTop: 20,
        padding: 14,
        flexDirection: 'column',
        alignSelf: 'center',
        justifyContent: 'space-between',
        width: '90%',
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.10,
        shadowRadius: 20,
        elevation: 5,
    },
    heading: {
        paddingBottom: 8,
        fontSize: 24,
        color: 'white',
        fontFamily: '$openSansBold',
    },
    textInput: {
        marginTop: 6,
        borderBottomWidth: 0.45,
        borderColor: '#000',
        borderRadius: 6,
        height: 40,
        width: '100%',
        paddingBottom: 6,
        fontSize: 16,
        fontFamily: '$openSansRegular',
    },
    submitButton: {
        marginTop: 11,
        marginBottom: 22,
        width: '47.5%',
        height: 60,
        borderRadius: 30,
        backgroundColor: '#6CE077', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'center',
    },
    backButton: {
        marginTop: 11,
        marginBottom: 22,
        width: '47.5%',
        height: 60,
        borderRadius: 30,
        backgroundColor: '#bdbdbd', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 24,
        color: 'white',
        fontFamily: '$openSansBold',
    },
    label: {
        fontFamily: '$openSansSemibold',
        fontSize: 20, 
    }

});

export default CommentScreen