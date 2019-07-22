import React, { Component } from 'react'
import { View, TextInput, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, Alert, AsyncStorage} from 'react-native'

//modules
import EStyleSheet from 'react-native-extended-stylesheet'
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
            lat: "",
            lng: "",
            photo: "",
        }
    }

    postToApi = async() => {
        await this._retrieveData()
        const url = "https://tmaas.m-leroy.pro/problem/send"
        const file = {
            uri: this.state.photo,
            name: 'reported picture',
            type: 'image/jpeg'
        }
        let formData = new FormData()

        /*if(this.state.problem == "" || this.state.street == "" || this.state.city == "" || this.state.street == "") {
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
        }*/
        //else {
            let data = 
            {
                "report": 
                {
                    "problem": this.state.problem,
                    "comment": this.state.comment,
                    "location":
                    {
                        "street": this.state.street,
                        "number": this.state.number,
                        "city": this.state.city,
                        "longitude": this.state.lng,
                        "latitude" : this.state.lat
                    }
                }
            }

            formData.append('file', file)
            formData.append('data', JSON.stringify(data))

        //}
            
            await fetch(url, {
                method: 'POST',
                body: formData,
                headers:{
                'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => console.log(res))
            .then(async(response) => await this.setState({
                status: response
            }))
            .then(console.log(this.state.status))
            .catch(error => console.error('Error:', error))

            Actions.completed()
        }
    //}

    goBack = () => {
        Actions.pop()
    }

    _retrieveData = async () => {
        try {
            const category = await AsyncStorage.getItem(Storage.CATEGORY)
            const problem = await AsyncStorage.getItem(Storage.PROBLEM)
            const lat = await AsyncStorage.getItem(Storage.LAT)
            const lng = await AsyncStorage.getItem(Storage.LNG)
            const street = await AsyncStorage.getItem(Storage.STREET)
            const city = await AsyncStorage.getItem(Storage.CITY)
            const number = await AsyncStorage.getItem(Storage.NUMBER)
            const photo = await AsyncStorage.getItem(Storage.PHOTO)

            this.setState({
                category: category,
                problem: problem,
                lat: lat,
                lng: lng,
                street: street,
                city: city,
                number: number,
                photo: photo,
            })
                
        } catch (error) {
            // Error retrieving data
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.heading}>Meld een Probleem</Text>
                    <Text style={styles.heading}>4/4</Text>
                </View>

                
                <ScrollView contentContainerStyle={{flex: 1, justifyContent: 'space-between'}}>
                    <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled keyboardVerticalOffset={0}> 
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
                    </KeyboardAvoidingView>
                </ScrollView>

                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: '5%', marginRight: '5%'}}>
                    <TouchableOpacity style={styles.backButton} onPress={this.goBack}>
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.submitButton} onPress={this.postToApi}>
                        <Text style={styles.buttonText}>Verzend</Text>
                    </TouchableOpacity>
                </View>

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