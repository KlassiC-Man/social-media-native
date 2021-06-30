import React, {useEffect, useLayoutEffect, useState} from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Platform, Image } from 'react-native'
import {ThemeProvider, Avatar, Button} from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import {auth, db, storage} from '../firebase';
import * as firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import Axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { disableExpoCliLogging } from 'expo/build/logs/Logs';

function PostScreen({navigation}) {
    const [message, setMessage] = useState('');
    const [image, setImage] = useState('');
    const [input, setInput] = useState('');
    const [photo, setPhoto] = useState('');
    const [dropdownOn, setDropdownOn] = useState(false);
    const [urlInput, setUrlInput] = useState('');

    //The current User!
    const user = firebase.auth().currentUser;

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
        });
    }, [navigation])

    // Some important vars.
    let res;
    let blob;

    //A function for picking the image!
    async function pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [7, 5],
            quality: 1,
        })
        console.log(result);
    
        if (!result.cancelled) {
            let newFile = {
                 uri: result.uri,
                 type: `test/${result.uri.split('.')[1]}`,
                 name: `test.png`
            }
	        res = await fetch(result.uri);
	        blob = await res.blob();
            //setPhoto(newFile);// I CAN SET THE PHOTO AS NEWFILE AND THEN SBMERGE THE FUNCTIONS OF HANDLEUPLOAD AND SENDPOST!!
            setImage(result.uri);        
        }
    };

   
    //function for sending the post not working properly as expected!!!!!
    /*function sendPost(){
        const data = new FormData();
        data.append('file', res);
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
    };*/

    function sendPost() {
        db.collection('posts').add({
            user: user.displayName,
            email: user.email,
            message: message,
            image: image,
            timestamp: 'sample',
            profilePic: user.photoURL,
        }).then(setTimeout(() => {
            navigation.navigate('Home');
        }, 4000)
        ).catch(e => alert(e));
    }

    function addPhotoWithLink() {
        if (dropdownOn === true) {
            setDropdownOn(false);
        } else {
            setDropdownOn(true);
        }
    };

    function submitPhotoUrl() {
        setPhoto(urlInput);
        setImage(urlInput);
    };

    return (
        <ScrollView style={{flexDirection: 'column', display: 'flex'}} contentContainerStyle={{justifyContent: 'flex-start'}}>
            
            <View style={{backgroundColor: 'black', flexDirection: 'row', width: '100%', height: 50, justifyContent: 'space-evenly'}}>
                <TouchableOpacity style={styles.sidebarIcon} onPress={pickImage}>
                    <MaterialIcons name='monochrome-photos' size={40} color='#AEE8F5' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.sidebarIcons}>
                    <MaterialIcons name='gif' size={40} color='#AEE8F5' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.sidebarIcons}>
                    <MaterialIcons name='video-library' size={40} color='#AEE8F5' />
                </TouchableOpacity>
                <TouchableOpacity onPress={addPhotoWithLink}>
                    <Entypo name='link' size={40} color='#AEE8F5' />
                </TouchableOpacity>
            </View>
            {dropdownOn === true ? <View style={{flexDirection: 'row'}}>
                {dropdownOn === true ? <TextInput style={{borderWidth: 1, margin: 5, borderRadius: 10, height: 40, flex: 1}} value={urlInput} onChangeText={text => setUrlInput(text)} placeholder='Photo Url With Url (.png, .jpeg at end)' /> : null}
                <Button style={{width: 100, }} title='Submit' onPress={submitPhotoUrl} />
            </View> : null}
            <View style={{ flexDirection: 'row', borderColor: 'black', margin: 5, }}>
                    <Avatar rounded size={50} source={{uri: user.photoURL}} />
                    <Text style={{paddingTop: 4, marginLeft: 2, fontSize: 16}}>{user.displayName}</Text>
                    <TouchableOpacity onPress={sendPost} style={{marginLeft: 200}}>
                        <Feather name='send' size={40} color='black' />
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'column', marginTop: 30, }}>
                    <TextInput onChangeText={text => setMessage(text)} style={{textAlignVertical: 'top', fontSize: 20, flex: 1, flexDirection: 'row', height: 50}} value={message} multiline={true} placeholder='Tell Your Friends Whats Going On' />
                    {image !== '' ? <Image source={{uri: image}} style={{height: 300, width: 380}} /> : null}
            </View>
        </ScrollView>
    )
};

export default PostScreen;

const styles = StyleSheet.create({
	sidebarIcons: {
		margin: 3,
	}
})
