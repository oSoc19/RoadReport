import React, { Component } from 'react'
import { View, TextInput, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView} from 'react-native'

//modules
import EStyleSheet from 'react-native-extended-stylesheet';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: "",
            status: "",
        }
    }

    postToApi = async() => {
        const url = "https://tmaas.m-leroy.pro/problem/send"

        var data = {
            "report": {
                "problem": {
                    "content": this.state.problem
                },
                "comment": {
                    "content": this.state.comment,
                },
                "location": {
                    "street": this.state.street,
                    "number": this.state.number,
                    "city": this.state.city,
                },
            }
        }
        
        await fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
            'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(async(response) => await this.setState({
            status: response
        }))
        .then(console.log(this.state.status))
        .catch(error => console.error('Error:', error))
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.heading}>Report a problem</Text>
                </View>

                <KeyboardAvoidingView style={{flex: 1, margin: 2, padding:2}} behavior="padding" enabled keyboardVerticalOffset={0}> 
                    <ScrollView>
                        <View style={styles.commentContainer}>
                            <Text style={styles.label}>Problem</Text>
                            <TextInput
                                placeholder = {"Problem"}
                                onChangeText={(problem) => this.setState({problem})}
                                value={this.state.problem}
                                editable = {true}
                                maxLength = {255}
                                style={styles.textInput}
                            />
                        </View>

                        <View style={styles.commentContainer}>
                            <Text style={styles.label}>Address</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <TextInput
                                    placeholder = {"Street"}
                                    onChangeText={(street) => this.setState({street})}
                                    value={this.state.street}
                                    editable = {true}
                                    maxLength = {255}
                                    style={styles.streetInput}
                                />
                                <TextInput
                                    placeholder = {"Number"}
                                    onChangeText={(number) => this.setState({number})}
                                    value={this.state.number}
                                    editable = {true}
                                    maxLength = {255}
                                    style={styles.numberInput}
                                />
                            </View>
                            <TextInput
                                placeholder = {"City"}
                                onChangeText={(city) => this.setState({city})}
                                value={this.state.city}
                                editable = {true}
                                maxLength = {255}
                                style={styles.textInput}
                            />
                        </View>

                        <View style={styles.commentContainer}>
                            <Text style={styles.label}>Comment</Text>
                            <TextInput
                                placeholder = {"Describe the problem..."}
                                onChangeText={(comment) => this.setState({comment})}
                                value={this.state.comment}
                                editable = {true}
                                maxLength = {255}
                                style={styles.textInput}
                            />
                        </View>
                    

                <TouchableOpacity style={styles.submitButton} onPress={this.postToApi}>
                    <Text style={styles.buttonText}>Send</Text>
                </TouchableOpacity>

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
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        height: '12%',
        backgroundColor: '#96D7AC'
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
        fontSize: 20,
    },
    textInput: {
        marginTop: 6,
        borderWidth: 1,
        borderColor: '#BFBFBF',
        borderRadius: 6,
        height: 60,
        width: '100%',
        padding: 6,
        fontSize: 18,
    },
    streetInput: {
        borderWidth: 1,
        borderColor: '#BFBFBF',
        borderRadius: 6,
        height: 60,
        width: '74%',
        padding: 6,
        fontSize: 18,
    },
    numberInput: {
        borderWidth: 1,
        borderColor: '#BFBFBF',
        borderRadius: 6,
        height: 60,
        width: '24%',
        padding: 6,
        fontSize: 18,
    },
    submitButton: {
        width: '90%',
        height: 60,
        borderRadius: 6,
        backgroundColor: '#96D7AC', 
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 18,
    },
    label: {
        fontSize: 18, 
    }

});

export default HomeScreen