import React, { Component } from 'react'
import { View, TextInput, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, Alert, Image} from 'react-native'

//modules
import EStyleSheet from 'react-native-extended-stylesheet'
import { Dropdown } from 'react-native-material-dropdown'
import {Actions} from 'react-native-router-flux'
import MapView, {Marker} from 'react-native-maps'

class AddressScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            street: "",
            number: "",
            city: "",
            marker: {
                latitude: 51.05,
                longitude: 3.73,
            },
            region: {
                latitude: 51.05,
                longitude: 3.73,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        }
    }

    postToApi = () => {
        Actions.photo()
    }

    getLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    marker: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    },
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.0032,
                        longitudeDelta: 0.0011,
                    },
                }, () => {console.log(this.state.region)});
            },
            (error) =>
                console.log(error),
            { enableHighAccuracy: false, timeout: 1000, maximumAge: 1000 },
        )
    }

    onRegionChange = (region) => {
        console.log(region)
      }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.heading}>Report a problem</Text>
                </View>

                <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled keyboardVerticalOffset={0}> 
                    <ScrollView contentContainerStyle={{flex: 1, justifyContent: 'space-between'}}>

                        <View style={{height: '70%'}}>
                            <MapView
                                style={styles.mapContainer}
                                region={this.state.region}
                                onRegionChange={this.onRegionChange}
                            >
                                <View style={{flex:1, width: 50, height: 50, justifyContent: 'space-around', alignItems: 'center'}}>
                                    <Image
                                        style={{width: 50, height: 50}}
                                        source={require('../assets/marker.png')}
                                    />
                                </View>
                            </MapView>

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
                            <TouchableOpacity style={styles.locationButton} onPress={this.getLocation}>
                                <Text style={styles.buttonText}>Use Current Location</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.bottomContainer}>
                            <View style={styles.pagination}>
                                <View style={styles.circel}/>
                                <View style={styles.circel__selected}/>
                                <View style={styles.circel}/>
                                <View style={styles.circel}/>
                            </View>

                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: '5%', marginRight: '5%'}}>
                                <TouchableOpacity style={styles.backButton} onPress={this.postToApi}>
                                    <Text style={styles.buttonText}>Back</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.submitButton} onPress={this.postToApi}>
                                    <Text style={styles.buttonText}>Next</Text>
                                </TouchableOpacity>
                            </View>
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
    pagination: {
        marginTop: 11,
        width: '20%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center'
    },
    circel: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#cfcfcf',
    },
    circel__selected: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#6e6e6e',
    },
    header: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        width: '100%',
        height: '11%',
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
    mapContainer: {
        backgroundColor: 'white',
        marginTop: '5%',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '90%',
        height: '50%',
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
        paddingBottom: 8,
        fontSize: 28,
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
        backgroundColor: 'grey', 
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
        borderRadius: 6,
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