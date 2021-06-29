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

function PostScreen({navigation}) {
    const [message, setMessage] = useState('');
    const [image, setImage] = useState(null);
    const [input, setInput] = useState('');
    const [photo, setPhoto] = useState('');

    //The current User!
    const user = firebase.auth().currentUser;

    //Create the name for the storage item!
    let name = Math.floor(10000 + Math.random() * 90000);

    

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
    function sendPost(){
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
    };


    return (
        <ScrollView style={{flexDirection: 'column', display: 'flex'}} contentContainerStyle={{justifyContent: 'flex-start'}}>
	    <View style={{backgroundColor: 'lightgray', flexDirection: 'column', width: 50, height: 300}}>
	    	<TouchableOpacity style={styles.sidebarIcon} onPress={pickImage}>
			<MaterialIcons name='monochrome-photos' size={40} color='black' />
	    	</TouchableOpacity>
	    	<TouchableOpacity style={styles.sidebarIcons}>
			<MaterialIcons name='gif' size={40} color='black' />
	    	</TouchableOpacity>
		<TouchableOpacity style={styles.sidebarIcons}>
			<MaterialIcons name='video-library' size={40} color='black' />
	    	</TouchableOpacity>	    	
	    </View>
	    <View style={{ flexDirection: 'row', borderColor: 'black', margin: 5, marginLeft: 70}}>
               	<Avatar rounded size={50} source={{uri: user.photoURL}} />
               	<Text style={{paddingTop: 4, marginLeft: 2, fontSize: 16}}>{user.displayName}</Text>
            </View>
            <View style={{flexDirection: 'column', marginTop: 30, marginLeft: 70}}>
               	<TextInput onChangeText={text => setInput(text)} style={{textAlignVertical: 'top', fontSize: 20, flex: 1, flexDirection: 'row', height: 50}} value={input} multiline={true} placeholder='Tell Your Friends Whats Going On' />
               	{image && <Image source={{uri: image}} style={{height: 300, width: 380}} />}
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
