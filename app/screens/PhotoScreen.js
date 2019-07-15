import React, { Component } from 'react'
import { View, TextInput, Text, TouchableOpacity, Alert, Image} from 'react-native'
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

//modules
import EStyleSheet from 'react-native-extended-stylesheet';
import {Actions} from 'react-native-router-flux'

class PhotoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            base64Icon: "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII=",
            display: 'none',
        };
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    postToApi = () => {
        Actions.comment()
    }

    goBack = () => {
        Actions.pop()
    }

    async snap() {       
        console.log(this.camera);
        if (this.camera) {
            console.log('Taking photo');
            const options = { quality: 1, base64: true, fixOrientation: true, 
            exif: true};
            await this.camera.takePictureAsync(options).then(photo => {
                photo.exif.Orientation = 1;            
                console.log(photo);            
            });     
        }
    }

    render() {
        const { hasCameraPermission } = this.state;

        if (hasCameraPermission === null) {
          return <View />;
        } else if (hasCameraPermission === false) {
          return <Text>No access to camera</Text>;
        } else {
          return (
            <View style={{ flex: 1 }}>

                <Camera ref={camera => this.camera = camera} style={{ flex: 1, flexDirection: "column", justifyContent: "flex-end", alignItems: 'center' }} type={this.state.type}>
                    
                    {/*<Image style={{width: 300, height: 300, borderWidth: 1, borderColor: 'white'}} source={{uri: 'data:image/png;base64,' + this.state.base64Icon }}/>*/}

                    <TouchableOpacity style={styles.trigger} onPress={this.snap}/>

                    <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '5%', paddingRight: '5%'}}>
                        <TouchableOpacity style={styles.backButton} onPress={this.goBack}>
                            <Text style={styles.buttonText}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.submitButton} onPress={this.postToApi}>
                            <Text style={styles.buttonText}>Skip</Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
          );
        }
    
    }
}

const styles = EStyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        color: '#0F0F0F',
    },
    trigger: {
        backgroundColor: '#FFF',
        width: 70,
        height: 70,
        borderRadius: 35,
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
    heading: {
        paddingBottom: 8,
        fontSize: 32,
        color: 'white',
        fontFamily: '$openSansBold',
    },
    submitButton: {
        marginTop: 11,
        marginBottom: 22,
        width: '47.5%',
        height: 60,
        borderRadius: 30,
        backgroundColor: '#2594d9', 
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

export default PhotoScreen