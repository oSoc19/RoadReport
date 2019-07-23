import React, { Component } from 'react'
import { View, TextInput, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, Alert, AsyncStorage, ActivityIndicator} from 'react-native'

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
            loadingDisplay: "none"
        }
    }

    componentDidMount() {
        this.lookForEmail()
    }

    toggleLoadingAnimation = () => {
        if(this.state.loadingDisplay == "none") {
            this.setState({
                loadingDisplay: "flex"
            })
        }else {
            this.setState({
                loadingDisplay: "none"
            })
        }
    }

    postToApi = async() => {

        this.toggleLoadingAnimation()

        await this._retrieveData()
        const url = "https://roadreport.osoc.be/problem/send"

        let file = ""
        if(this.state.photo != null) {
            file = {
                uri: this.state.photo,
                name: 'reported picture',
                type: 'image/jpeg'
            }
        }
        else
            file = ""

        let formData = new FormData()

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
                },
                "email": this.state.email
            }
        }

        formData.append('file', file)
        formData.append('data', JSON.stringify(data))
        
        fetch(url, {
            method: 'POST',
            body: formData,
            headers:{
            'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => res.json())
        .then(json => this.setState({
            status: json
        }))
        .then(() => this.toggleLoadingAnimation())
        .then(() => {
            if(this.state.status.result == "success"){ 
                Actions.completed() 
            }
            else {
                Alert.alert(
                'Oeps! Er ging iets mis!',
                'Probeer het opnieuw.',
                [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                ],
                {cancelable: false},
                )
            }
        })
        .catch(error => console.error('Error:', error))
    }

    goBack = () => {
        Actions.pop()
    }

    lookForEmail = async() => {
        try {
            const email = await AsyncStorage.getItem(Storage.EMAIL)
            if(email != null) {
                this.setState({
                    email: email
                })
            }
        } catch (error) {

        }
    }

    _retrieveData = async() => {
        try {
            const category = await AsyncStorage.getItem(Storage.CATEGORY)
            const problem = await AsyncStorage.getItem(Storage.PROBLEM)
            const lat = await AsyncStorage.getItem(Storage.LAT)
            const lng = await AsyncStorage.getItem(Storage.LNG)
            const street = await AsyncStorage.getItem(Storage.STREET)
            const city = await AsyncStorage.getItem(Storage.CITY)
            const number = await AsyncStorage.getItem(Storage.NUMBER)
            const photo = await AsyncStorage.getItem(Storage.PHOTO)
            const comment = await AsyncStorage.getItem(Storage.COMMENT)

            AsyncStorage.setItem(Storage.EMAIL, this.state.email.toString())

            this.setState({
                category: category,
                problem: problem,
                lat: lat,
                lng: lng,
                street: street,
                city: city,
                number: number,
                photo: photo,
                comment: comment,
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

                <View style={{flex:1, display: this.state.loadingDisplay, position: 'absolute', justifyContent:'space-around', alignItems: 'center', width: '100%', height: '100%', backgroundColor: '#FFF', opacity: 0.5}} >
                    <ActivityIndicator animating={true} size="large" color="#000" />
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