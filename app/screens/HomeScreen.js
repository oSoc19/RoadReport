import React, { Component } from 'react'
import { View, TextInput, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, Alert} from 'react-native'

//modules
import EStyleSheet from 'react-native-extended-stylesheet';
import { Dropdown } from 'react-native-material-dropdown';
import {Actions} from 'react-native-router-flux'

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: "",
            status: "",
            problem: "",
            street: "",
            number: "",
            city: "",
            category: "",
        }
    }

    postToApi = async() => {
        const url = "https://tmaas.m-leroy.pro/problem/send"

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
            .catch(error => console.error('Error:', error))
            Actions.completed()
        }
    }

    render() {

        let categories = [{
            value: 'Bicycle path/footpath',
            }, {
            value: 'Signalisation',
            }, {
            value: 'Bicycle rack',
            },{
            value: 'Cycling infrastructure',
            },{
            value: 'Other',
            },];

        let events = []

        switch(this.state.category) {

            case 'Bicycle path/footpath':
                events = [{
                    value: 'Hole in footpath',
                    }, {
                    value: 'Hole in bicycle path',
                    }, {
                    value: 'Damaged footpath',
                    },{
                    value: 'Damaged bicycle path',
                    },{
                    value: 'Unclear marking pedestrian crossing',
                    },{
                    value: 'Unclear marking bicycle path',
                    },{
                    value: 'Snow, frost, slipperiness',
                    },{
                    value: 'Glass ',
                    },{
                    value: 'Blocked guiding lines for blind people',
                    },];
                break;
            
            case 'Signalisation':
                events = [{
                    value: 'Sign gone/moved',
                    }, {
                    value: 'Traffic light defect',
                    }, {
                    value: 'Traffic light button defect',
                    },{
                    value: 'Problem with VMS sign',
                    },{
                    value: 'Bicycle counter defect',
                    },];
                break;
        
            case 'Bicycle rack':
                events = [{
                    value: 'Always full',
                    }, {
                    value: 'In need of reparation',
                    }, {
                    value: 'Weed / trash',
                    },{
                    value: 'Left bicycles',
                    },{
                    value: 'Suggestion for sheltered/indoor bicycle rack',
                    },];
                break;
        
            case 'Cycling infrastructure':
                events = [{
                    value: 'Broken cycling pump',
                    }, {
                    value: 'Broken/empty cycling lights vending machine',
                    }, {
                    value: 'Broken repair machine',
                    },];
                break;

            case 'Other':
                events = [{
                    value: 'Unaccessible footpath for wheelchairs',
                    }, {
                    value: 'Dangerous crossing for cyclists/pedestrians',
                    }, {
                    value: 'Dangerous situation for cyclists/pedestrians',
                    },];
                break;
        
            default:
                events = []
            
            }

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.heading}>Report a problem</Text>
                </View>

                <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled keyboardVerticalOffset={0}> 
                    <ScrollView style={{flex: 1}}>
                        <View style={styles.commentContainer}>
                            <Text style={styles.label}>Problem</Text>
                            <Dropdown
                                onChangeText={(value) => this.setState({category: value})}
                                baseColor={"#0A0A0A"}
                                labelFontSize={18}
                                label='Category'
                                data={categories}
                                itemCount={16}
                            />
                            <Dropdown
                                onChangeText={(value) => this.setState({problem: value})}
                                baseColor={"#0A0A0A"}
                                labelFontSize={18}
                                label='Event'
                                data={events}
                                itemCount={16}
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
                                    keyboardType={"numeric"} 
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
        backgroundColor: 'white',
        color: '#0F0F0F',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        height: '12%',
        backgroundColor: '#2594d9',
        paddingLeft: '5%',
    },
    commentContainer: {
        backgroundColor: 'white',
        marginTop: '5%',
        padding: '4%',
        flexDirection: 'column',
        alignSelf: 'center',
        justifyContent: 'space-between',
        width: '90%',
        borderRadius: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.10,
        shadowRadius: 20,

        elevation: 35,
    },
    heading: {
        paddingTop: '7%',
        fontSize: 32,
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
    streetInput: {
        borderBottomWidth: 0.45,
        borderColor: '#000',
        borderRadius: 6,
        height: 40,
        width: '74%',
        paddingBottom: 6,
        fontSize: 16,
        fontFamily: '$openSansRegular',
    },
    numberInput: {
        borderBottomWidth: 0.45,
        borderColor: '#000',
        borderRadius: 6,
        height: 40,
        width: '24%',
        paddingBottom: 6,
        fontSize: 16,
        fontFamily: '$openSansRegular',
    },
    submitButton: {
        marginTop: '5%',
        width: '90%',
        height: 60,
        borderRadius: 30,
        backgroundColor: '#6CE077', 
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
        fontFamily: '$openSansRegular',
        fontSize: 20, 
    }

});

export default HomeScreen