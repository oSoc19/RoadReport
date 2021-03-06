import React, { Component } from 'react'
import { View, TextInput, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, AsyncStorage, Alert} from 'react-native'

import { t } from '../localization/Localization';
//modules
import EStyleSheet from 'react-native-extended-stylesheet'
import { Dropdown } from 'react-native-material-dropdown'
import {Actions} from 'react-native-router-flux'

import Storage from '../constants/Storage'

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: "",
            status: "",
            problem: "",
            category: "",
            otherOther: false,
        }
    }

    goNext = async() => {
        if(this.state.problem == "" || this.state.problem == null) {
            Alert.alert(
                'Geen probleem gekozen',
                'Gelieve een probleem te kiezen alvorens door te gaan.',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                ],
                {cancelable: false},
            )
        } else {
            if( this.state.comment == "" && this.state.otherOther == true) {
                Alert.alert(
                    'Geen probleem ingevuld',
                    'Gelieve het probleem te beschrijven.',
                    [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    ],
                    {cancelable: false},
                )
            } else {
                this._storeData()
                Actions.address()
            }
        }
    }

    _storeData = async () => {
        try {
            AsyncStorage.setItem(Storage.PROBLEM, this.state.problem.toString())
            AsyncStorage.setItem(Storage.COMMENT, this.state.comment.toString())
        } catch (error) {
            console.log(error)
        }
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
            value: 'Straatverlichting defect',
            },{
            value: 'Andere',
            },];

        let events = []

        switch(this.state.category) {

            case 'Fietspad/voetpad':
                events = [{
                    value: 'Gat in het voetpad',
                    index: 1
                    }, {
                    value: 'Gat in het fietspad',
                    index: 2
                    }, {
                    value: 'Beschadiging van het voetpad',
                    index: 3
                    },{
                    value: 'Beschadiging van het fietspad',
                    index: 4
                    },{
                    value: 'Markering zebrapad',
                    index: 5
                    },{
                    value: 'Markering fietspad',
                    index: 6
                    },{
                    value: 'Sneeuw, ijzel, gladheid',
                    index: 7
                    },{
                    value: 'Glas ',
                    index: 8
                    },{
                    value: 'Blindengeleidelijnen versperd',
                    index: 9
                    },{
                    value: 'Hinderlijke inname van voetpad',
                    index: 10
                    },{
                    value: 'Hinderlijke inname van fietspad',
                    index: 11
                    },];
                break;
            
            case 'Signalisatie':
                events = [{
                    value: 'Bord weg/verplaatst',
                    index: 12
                    }, {
                    value: 'Verkeerslicht defect',
                    index: 13
                    }, {
                    value: 'Drukknop verkeerslicht defect',
                    index: 14
                    },{
                    value: 'Probleem met verkeersgeleidingssysteem bord',
                    index: 15
                    },{
                    value: 'Fietstelpaal defect',
                    index: 16
                    },];
                break;
        
            case 'Fietsenstalling':
                events = [{
                    value: 'Overvol',
                    index: 17
                    }, {
                    value: 'Te herstellen',
                    index: 18
                    }, {
                    value: 'Onkruid / zwerfvuil',
                    index: 19
                    },{
                    value: 'Achtergelaten fietsen',
                    index: 20
                    },{
                    value: 'Suggestie voor locatie overdekte/inpandige fietsenstalling',
                    index: 21
                    },];
                break;
        
            case 'Fietsinfrastructuur':
                events = [{
                    value: 'Fietspomp kapot',
                    index: 22
                    }, {
                    value: 'Herstelzuil kapot',
                    index: 23
                    }, {
                    value: 'Fietslichtjes automaat leeg/kapot',
                    index: 24
                    },];
                break;
            case 'Straatverlichting defect':
                events = [{
                    value: 'Lamp defect',
                    index: 31
                    }, {
                    value: 'Lamp blijft branden',
                    index: 32
                    }, {
                    value: 'Lamp knippert',
                    index: 33
                    },{
                    value: 'Meerdere lampen blijven branden',
                    index: 34
                    },{
                    value: '4 of meer opeenvolgende lampen defect',
                    index: 35
                    },{
                    value: 'Volledige straat zonder verlichting',
                    index: 36
                    },{
                    value: 'Ander defect',
                    index: 37
                    },];
                break;

            case 'Andere':
                events = [{
                    value: 'Ontoegankelijk voetpad voor rolstoelgebruikers',
                    index: 25
                    }, {
                    value: 'Gevaarlijk kruispunt voor fietsers/voetgangers',
                    index: 26
                    }, {
                    value: 'Gevaarlijke situatie voor fietsers/voetgangers',
                    index: 27
                    },{
                    value: 'Defecte/ontbrekende straatverlichting ',
                    index: 28
                    }, {
                    value: 'Drukte op het voetpad',
                    index: 29
                    }, {
                    value: 'Andere',
                    index: 30
                    },];
                break;
        
            default:
                events = []
            
            }

            setProblem = (value) => {
                events.forEach(event => {
                    if(event.value == value) {
                        this.setState({
                            problem: event.index
                        })
                    }
                })

                if(value == "Andere"){
                    this.setState({
                        otherOther: true
                    })
                } else {
                    this.setState({
                        otherOther: false
                    })
                }
            }

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.heading}>Meld een Probleem</Text>
                    <Text style={styles.heading}>1/4</Text>
                </View>
                <ScrollView contentContainerStyle={{flex: 1, justifyContent: 'space-between'}}>
                    <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled keyboardVerticalOffset={0}> 
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
                                onChangeText={(value) => {setProblem(value)}}
                                baseColor={"#0A0A0A"}
                                labelFontSize={18}
                                label='Probleem'
                                data={events}
                                itemCount={16}
                            />
                        </View>
                        <View style={styles.commentContainer}>
                            <Text style={styles.label}>Heb je meer info over het probleem?</Text>
                            <TextInput
                                returnKeyType='done'
                                placeholder = {"Beschrijf het probleem..."}
                                onChangeText={(comment) => this.setState({comment})}
                                value={this.state.comment}
                                editable = {true}
                                maxLength = {255}
                                style={styles.textInput}
                            />
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>

                <TouchableOpacity style={styles.submitButton} onPress={this.goNext}>
                    <Text style={styles.buttonText}>{t('general.next')}</Text>
                </TouchableOpacity>

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