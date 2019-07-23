import React, { Component } from 'react'
import * as Permissions from 'expo-permissions';
import { View, TextInput, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, AsyncStorage, Image, ActivityIndicator, Alert} from 'react-native'

//modules
import EStyleSheet from 'react-native-extended-stylesheet'
import {Actions} from 'react-native-router-flux'
import MapView from 'react-native-maps'

import Storage from '../constants/Storage'

class AddressScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingDisplay: "none",
            hasLocationPermission: null,
            street: "",
            number: "",
            city: "",
            region: {
                latitude: 51.05,
                longitude: 3.73,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        }
    }

    async componentDidMount() {
        console.log(this.state.loadingDisplay)
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        this.setState({ hasLocationPermission: status === 'granted' });
    }

    goNext = () => {
        if(this.state.street != "" && this.state.number != "" && this.state.city != "" ) {
            this._storeData()
            Actions.photo()
        } else {
            Alert.alert(
                'Adres niet volledig',
                'Gelieve het adres volledig in te vullen alvorens door te gaan.',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                ],
                {cancelable: false},
            )
        }
    }

    goBack = () => {
        Actions.pop()
    }

    _storeData = async () => {
        try {
            AsyncStorage.setItem(Storage.STREET, this.state.street)
            AsyncStorage.setItem(Storage.CITY, this.state.city)
            AsyncStorage.setItem(Storage.NUMBER, this.state.number)
            AsyncStorage.setItem(Storage.LAT, this.state.region.latitude.toString())
            AsyncStorage.setItem(Storage.LNG, this.state.region.longitude.toString())
        } catch (error) {
        console.log(error)
        }
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

    getAddressWithCoordinates = async(lat, lng) => {
        try {
            let response = await fetch(
            'https://roadreport.osoc.be//best@/reverse?point.lat=' + lat + '&point.lon=' + lng,
            )
            let responseJson = await response.json()

            if(responseJson.features[0].properties.street != null) {
                this.setState({
                    street: responseJson.features[0].properties.street
                })
            }
            else
                this.state.street = ""

            if(responseJson.features[0].properties.locality != null) {
                this.setState({
                    city: responseJson.features[0].properties.locality
                })
            }
            else
                this.state.city = ""

            if(responseJson.features[0].properties.housenumber != null) {
                this.setState({
                    number: responseJson.features[0].properties.housenumber
                })
            }
            else
                this.state.number = ""

        } catch (error) {
            console.error(error)
        }
    }

    getLocation = () => {
        if(this.state.hasLocationPermission) {
            this.toggleLoadingAnimation()

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.setState({
                        region: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            latitudeDelta: 0.0032,
                            longitudeDelta: 0.0011,
                        },
                    }, this.toggleLoadingAnimation());
                    this.getAddressWithCoordinates(position.coords.latitude, position.coords.longitude)
                },
                (error) =>
                    console.log(error),
                { enableHighAccuracy: false, timeout: 1000, maximumAge: 1000 },
            )
        } else {
            Alert.alert(
                'Geen toestemming tot locatie',
                'Ga naar je instellingen en sta locatie toe bij gebruik van deze app.',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                ],
                {cancelable: false},
              )
        }
    }

    onRegionChange = (region) => {
        if(this.state.region != region) {
        this.setState({
            region: region
        })
        this.getAddressWithCoordinates(region.latitude, region.longitude)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.heading}>Meld een Probleem</Text>
                    <Text style={styles.heading}>2/4</Text>
                </View>

                <ScrollView contentContainerStyle={{justifyContent: 'space-between'}}>
                    <View style={{width: '100%', height: '140%', justifyContent: 'center', alignItems: 'center'}}>
                        <MapView
                            style={styles.mapContainer}
                            region={this.state.region}
                            onRegionChangeComplete={this.onRegionChange}
                        />
                        <View pointerEvents="none" style={{width: 50, height: 100, justifyContent: 'space-around', alignItems: 'center', paddingBottom: 50, position: 'absolute', elevation: 36}}>
                            <Image
                                style={{width: 50, height: 50}}
                                source={require('../assets/marker.png')}
                            />
                        </View>
                    </View>
                    <KeyboardAvoidingView style={{flex:1}} behavior="position" enabled keyboardVerticalOffset={0}>
                        <View style={styles.commentContainer}>
                            <Text style={styles.label}>Adres</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <TextInput
                                    placeholder = {"Straat"}
                                    onChangeText={(street) => this.setState({street})}
                                    value={this.state.street}
                                    editable = {true}
                                    maxLength = {255}
                                    style={styles.streetInput}
                                />
                                <TextInput
                                    keyboardType={"numeric"} 
                                    placeholder = {"Huisnummer"}
                                    onChangeText={(number) => this.setState({number})}
                                    value={this.state.number}
                                    editable = {true}
                                    maxLength = {255}
                                    style={styles.numberInput}
                                />
                            </View>
                            <TextInput
                                placeholder = {"Stad"}
                                onChangeText={(city) => this.setState({city})}
                                value={this.state.city}
                                editable = {true}
                                maxLength = {255}
                                style={styles.textInput}
                            />
                        </View>
                        <TouchableOpacity style={styles.locationButton} onPress={this.getLocation}>
                            <Text style={styles.buttonText}>Gebruik huidige locatie</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </ScrollView>

                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: '5%', marginRight: '5%',}}>
                    <TouchableOpacity style={styles.backButton} onPress={this.goBack}>
                        <Text style={styles.buttonText}>Terug</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.submitButton} onPress={this.goNext}>
                        <Text style={styles.buttonText}>Volgende</Text>
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

    mapContainer: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        alignSelf: 'center',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: '100%',
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
    streetInput: {
        borderBottomWidth: 0.45,
        borderColor: '#000',
        borderRadius: 6,
        height: 40,
        width: '64%',
        paddingBottom: 6,
        fontSize: 16,
        fontFamily: '$openSansRegular',
    },
    numberInput: {
        borderBottomWidth: 0.45,
        borderColor: '#000',
        borderRadius: 6,
        height: 40,
        width: '34%',
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
    locationButton: {
        marginTop: 11,
        marginBottom: 22,
        width: '90%',
        height: 60,
        borderRadius: 12,
        backgroundColor: '#2594d9', 
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

export default AddressScreen