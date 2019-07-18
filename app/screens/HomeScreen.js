import React, { Component, AsyncStorage } from 'react'
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
            otherProblem: "",
            street: "",
            number: "",
            city: "",
            category: "",
            otherBoxDisplayState: 'none',
        }
    }

    postToApi = async() => {
        try {
            await AsyncStorage.setItem('Problem', this.state.problem);
          } catch (error) {
            // Error saving data
          }

        Actions.address()
    }

    render() {

        let categories = [{
            value: 'Fietspad/voetpad',
            }, {
            value: 'Signalisatie',
            }, {
            value: 'Fietsenstalling',
            },{
            value: 'Fietsinfrastructuur',
            },{
            value: 'Andere',
            },];

        let events = []

        switch(this.state.category) {

            case 'Fietspad/voetpad':
                events = [{
                    value: 'Gat in het voetpad',
                    }, {
                    value: 'Gat in het fietspad',
                    }, {
                    value: 'Beschadiging van het voetpad',
                    },{
                    value: 'Beschadiging van het fietspad',
                    },{
                    value: 'Markering zebrapad',
                    },{
                    value: 'Markering fietspad',
                    },{
                    value: 'Sneeuw, ijzel, gladheid',
                    },{
                    value: 'Glas ',
                    },{
                    value: 'Blindengeleidelijnen versperd',
                    },{
                    value: 'Hinderlijke inname van voetpad',
                    },{
                    value: 'Hinderlijke inname van fietspad',
                    },];
                break;
            
            case 'Signalisatie':
                events = [{
                    value: 'Bord weg/verplaatst',
                    }, {
                    value: 'Verkeerslicht defect',
                    }, {
                    value: 'Drukknop verkeerslicht defect',
                    },{
                    value: 'Probleem met verkeersgeleidingssysteem bord',
                    },{
                    value: 'Fietstelpaal defect',
                    },];
                break;
        
            case 'Fietsenstalling':
                events = [{
                    value: 'Overvol',
                    }, {
                    value: 'Te herstellen',
                    }, {
                    value: 'Onkruid / zwerfvuil',
                    },{
                    value: 'Achtergelaten fietsen',
                    },{
                    value: 'Suggestie voor locatie overdekte/inpandige fietsenstalling',
                    },];
                break;
        
            case 'Fietsinfrastructuur':
                events = [{
                    value: 'Fietspomp kapot',
                    }, {
                    value: 'Herstelzuil kapot',
                    }, {
                    value: 'Fietslichtjes automaat leeg/kapot',
                    },];
                break;

            case 'Andere':
                events = [{
                    value: 'Ontoegankelijk voetpad voor rolstoelgebruikers',
                    }, {
                    value: 'Gevaarlijk kruispunt voor fietsers/voetgangers',
                    }, {
                    value: 'Gevaarlijke situatie voor fietsers/voetgangers',
                    },{
                    value: 'Defecte/ontbrekende straatverlichting ',
                    }, {
                    value: 'Drukte op het voetpad',
                    }, {
                    value: 'Andere',
                    },];
                break;
        
            default:
                events = []
            
            }

            checkForOther = (value) => {
                if(value == 'Andere')
                    this.setState({
                        otherBoxDisplayState: 'flex'
                    })
                else
                    this.setState({
                        otherBoxDisplayState: 'none'
                    })
            }

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.heading}>Meld een Probleem</Text>
                    <Text style={styles.heading}>1/4</Text>
                </View>

                <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled keyboardVerticalOffset={0}> 
                    <ScrollView contentContainerStyle={{flex: 1, justifyContent: 'space-between'}}>
                        <View style={{flex: 1}}>
                            <View style={styles.commentContainer}>
                                <Text style={styles.label}>Kies een probleem uit de lijst</Text>
                                <Dropdown
                                    onChangeText={(value) => this.setState({category: value})}
                                    baseColor={"#0A0A0A"}
                                    labelFontSize={18}
                                    label='Categorie'
                                    data={categories}
                                    itemCount={16}
                                />
                                <Dropdown
                                    onChangeText={(value) => {this.setState({problem: value}); checkForOther(value)}}
                                    baseColor={"#0A0A0A"}
                                    labelFontSize={18}
                                    label='Probleem'
                                    data={events}
                                    itemCount={16}
                                />
                            </View>
                            <View style={{display: this.state.otherBoxDisplayState, flex: 1}}>
                                <View style={styles.commentContainer}>
                                    <Text style={styles.label}>Wat is het probleem?</Text>
                                    <TextInput
                                        placeholder = {"Beschrijf het probleem..."}
                                        onChangeText={(otherProblem) => this.setState({otherProblem})}
                                        value={this.state.otherProblem}
                                        editable = {true}
                                        maxLength = {255}
                                        style={styles.textInput}
                                    />
                                </View>
                            </View>
                        </View>

                            <TouchableOpacity style={styles.submitButton} onPress={this.postToApi}>
                                <Text style={styles.buttonText}>Volgende</Text>
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
        height: 40,
        width: '100%',
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
        marginTop: 11,
        marginBottom: 22,
        width: '90%',
        height: 60,
        borderRadius: 30,
        backgroundColor: '#6CE077', 
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

export default HomeScreen