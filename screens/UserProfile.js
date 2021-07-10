import React, { useLayoutEffect, useEffect, useState } from 'react'
import { View,  ScrollView, Image, TouchableOpacity, Platform } from 'react-native'
import * as firebase from 'firebase';
import {auth, db, storage} from '../firebase';
import {Text, Button} from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

function UserProfile({navigation}) {
    const newImage = useState(null);

    const user = firebase.auth().currentUser;

    //use layout effect for making the title of the naviagtion pane change to 'Profile'
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Profile',
        })
    }, [navigation])

    // Function for sign out!
    function signOut() {
        auth.signOut().then(() => {
            navigation.replace('Login');
        })
    };

    // function for picking an image from the profile for the profile pic!
    //This is incomplete! It has to be linked with storage!
    async function pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        })
        console.log(result);
    
        if (!result.cancelled) {
            user.updateProfile({
                photoURL: result.uri,//Updates have to be done here so that the storage starts working!!!!!!!
            })
        }
    };

    return (
        <ScrollView style={{display: 'flex', flex: 1}}>
            <View style={{borderBottomWidth: 1, borderBottomColor: 'lightgray'}}>
                <Image source={{uri: user.photoURL}} style={{height: 210, margin: 20, marginBottom: 0, borderRadius: 5}} />
                <TouchableOpacity onPress={pickImage}>
                    <AntDesign name="camerao" size={35} color="black" style={{justifyContent: 'flex-end', flexDirection: 'row'}} />
                </TouchableOpacity>
                <Text h3 style={{fontWeight: 800,alignSelf: 'center'}}>{user.displayName}</Text>
            </View>
            <View style={{marginTop: 30}}>
                <Button title='Sign Out' onPress={signOut} riased />
            </View>
        </ScrollView>
    )
};


export default UserProfile;
