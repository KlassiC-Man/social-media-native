import React, {useEffect, useLayoutEffect, useState} from 'react'
import { View, Text, TextInput, TouchableOpacity, Platform, Image } from 'react-native'
import {ThemeProvider, Avatar, Button} from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import {auth, db, storage} from '../firebase';
import * as firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import Axios from 'axios';

function PostScreen({navigation}) {
    const [message, setMessage] = useState('');
    const [image, setImage] = useState(null);
    const [input, setInput] = useState('');
    const [photo, setPhoto] = useState('');

    //The current User!
    const user = firebase.auth().currentUser;

    //Create the name for the storage item!
    let name = Math.floor(10000 + Math.random() * 90000);

    let theUrl;
    

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('We need camera and Image Acces!!!');
                }
            }
        })
    }, []);

    //Change the title of the naviagtion pane and add a send button in the right side of the pane!
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Send Post',
            headerRight: () => (
                <View>
                    <TouchableOpacity onPress={sendPost}>
                        <Feather name='send' size={30} color='cadetblue' style={{marginRight: 4}} />
                    </TouchableOpacity>
                </View>
            )
        });
    }, [navigation])

    //A function for picking the image!
    async function pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        })
        console.log(result);
    
        if (!result.cancelled) {
            let newFile = {
                 uri: result.uri,
                 type: `test/${result.uri.split('.')[1]}`,
                 name: `test.${result.uri.split(".")[1]}`}
            setPhoto(newFile);// I CAN SET THE PHOTO AS NEWFILE AND THEN SBMERGE THE FUNCTIONS OF HANDLEUPLOAD AND SENDPOST!!
            setImage(result.uri);
        }
    };

    async function sendPost(){
        const data = new FormData();
        data.append('file', photo);
        data.append('upload_preset', 'pfrzfrnr');
        data.append('cloud_name' ,'dyin2a2pd');
        fetch('https://api.cloudinary.com/v1_1/dyin2a2pd/image/upload/', {
            method: 'post',
            body: data
        }).then(res => res.json()).
        then(data => {
            db.collection('posts').add({
                user: user.displayName,
                email: user.email,
                message: message,
                image: data.secure_url,
                timestamp: 'sample',
                profilePic: user.photoURL,
            })
        })
        navigation.navigate('Home');
    };


    return (
        <ScrollView>
            <View style={{display: 'flex',  flexDirection: 'row', borderColor: 'black', margin: 5}}>
                <Avatar rounded size={50} source={{uri: user.photoURL}} />
                <Text style={{paddingTop: 4, marginLeft: 2, fontSize: 16}}>{user.displayName}</Text>
            </View>
            <View style={{flexDirection: 'column', marginTop: 60}}>
                <TextInput onChangeText={text => setInput(text)} style={{textAlignVertical: 'top', fontSize: 20, flex: 1, flexDirection: 'row', height: 50}} value={input} multiline={true} placeholder='Tell Your Friends Whats Going On' />
                {image && <Image source={{uri: image}} style={{height: 300, width: 380}} />}
            </View>
            <ScrollView style={{paddingTop: 90}}>
                <Button title='Choose Image' onPress={pickImage} style={{backgroundColor: 'black'}} />
            </ScrollView>
        </ScrollView>
    )
};

export default PostScreen;
