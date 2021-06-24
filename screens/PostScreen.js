import React, {useEffect, useLayoutEffect, useState} from 'react'
import { View, Text, TextInput, TouchableOpacity, Platform, Image } from 'react-native'
import {ThemeProvider, Avatar, Button} from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import {auth, db, storage} from '../firebase';
import * as firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';

function PostScreen({navigation}) {
    const [message, setMessage] = useState('');
    const [image, setImage] = useState(null);

    //The current User!
    const user = firebase.auth().currentUser;

    //Create the name for the storage item!
    let name = Math.floor(10000 + Math.random() * 90000);

    //The storage Reference!
    const storageRef = storage.ref();
    const imagesRef = storageRef.child('images/'+name);

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

    function sendPost() {
        let uploadTask = imagesRef.put(image).then((snapshot) => {
            console.log("Uploaded the file!")
        }).catch(error => alert(error));
        let downloadURL = 'gs://soci-8909e.appspot.com/images/' + name;
        console.log(downloadURL);
        let fownloadURL = storageRef.child('images/'+name).getDownloadURL();
        db.collection('posts').add({
            user: user.displayName,
            email: user.email,
            message: message,
            image: downloadURL,
            profilePic: user.photoURL,
            timestamp: 'Sample',
        });
        navigation.navigate('Home');
    }

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
            setImage(result.uri);
        }
    };


    return (
        <ScrollView>
            <View style={{display: 'flex',  flexDirection: 'row', borderColor: 'black', margin: 5}}>
                <Avatar rounded size={50} source={{uri: user.photoURL}} />
                <Text style={{paddingTop: 4, marginLeft: 2, fontSize: 16}}>{user.displayName}</Text>
            </View>
            <View style={{flexDirection: 'column', marginTop: 60}}>
                <TextInput onChangeText={text => setMessage(text)} style={{textAlignVertical: 'top', fontSize: 20, flex: 1, flexDirection: 'row', height: 50}} autoFocus={true} value={message} multiline={true} placeholder='Tell Your Friends Whats Going On' />
                {image && <Image source={{uri: image}} style={{height: 300, width: 380}} />}
            </View>
            <ScrollView style={{paddingTop: 90}}>
                <Button title='Choose Image' onPress={pickImage} style={{backgroundColor: 'black'}} />
            </ScrollView>
        </ScrollView>
    )
};

export default PostScreen;