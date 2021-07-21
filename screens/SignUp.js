import React, { useState, useEffect } from 'react';
import {KeyboardAvoidingView, ScrollView,Image , StyleSheet, View, TouchableOpacity, Text, TextInput, ImagePickerIOS} from 'react-native';
import {Input, Button} from 'react-native-elements';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import {auth, db} from '../firebase';
import * as ImagePicker from 'expo-image-picker';

function SignUp({navigation}) {
    let randomPic = Math.floor(1000 + Math.random() * 9000);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState(`https://ui-avatars.com/api/?name=${name}`);
    const [bio, setBio] = useState('');
    const [photo, setPhoto] = useState(`https://ui-avatars.com/api/?name=${name}`);
    const [phoneNo, setPhoneNo] = useState('');

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

    function signUp() {
        if (String(phoneNo).length !== 10) {
            alert('Valid No Hasnt been entered!!');
        } else {
            const data = new FormData();
            data.append('file', photo);
            data.append('upload_preset', 'pfrzfrnr');
            data.append('cloud_name', 'dyin2a2pd');
            fetch('https://api.cloudinary.com/v1_1/dyin2a2pd/image/upload/', {
                method: 'post',
                body: data
            }).then(res => res.json()).then(data => {
                db.collection('users').add({
                    name: name,
                    email: email,
                    follower: [],
                    following: [],
                    posts: [],
                    profilePic: data.secure_url,
                    phoneNo: phoneNo,
                })
                auth.createUserWithEmailAndPassword(email, password).then(authUser => {
                    authUser.user.updateProfile({
                        displayName: name,
                        photoURL: data.secure_url,
                        phoneNumber: phoneNo,
                    })
                })
            })
        }
    };
        

    async function pickProfile() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [7, 10],
            quality: 1,
        })
        console.log(result);

        if (!result.cancelled) {
            let newFile = {
                uri: result.uri,
                type: `test/${result.uri.split('.')[1]}`,
                name: 'test.png',
            }
            setImageUrl(result.uri);
            setPhoto(newFile);
        }
    };

    return (
        <ScrollView style={{color:'black'}}>
            <View style={{backgroundColor: 'purple', height: 100, width: 200, borderBottomRightRadius: 60}}></View>
            <View style={{backgroundColor: 'cadetblue', height: 50, width: 170, borderBottomRightRadius: 50}}></View>
            <TouchableOpacity onPress={pickProfile} style={{marginTop: 5, flexDirection:'row', justifyContent: 'center'}}>
                <Avatar source={{uri: imageUrl}} size={100} rounded />
            </TouchableOpacity>
            <TextInput type='text' placeholder='Username' value={name} onChangeText={text => setName(text)} style={styles.input} />
            <TextInput type='email' placeholder='E-Mail' value={email} onChangeText={text => setEmail(text)} style={styles.input} />
            <TextInput type='password' placeholder='Password' value={password} secureTextEntry onChangeText={text => setPassword(text)} style={styles.input} />
            <TextInput type='text' placeholder='Phone No.' value={phoneNo} onChangeText={text => setPhoneNo(text)} style={styles.input} />
            {String(phoneNo).length !== 10 ? <Text style={{marginLeft: 20, color: 'red'}}>Please Enter Valid Number!</Text>: null}
            {/*<TextInput type='text' placeholder='Image URL for Profile (Optional) .png or .jpeg links' onChangeText={text => setImageUrl(text)} style={styles.input} value={imageUrl} />*/}
            {/*<Input type='text' placeholder='Bio' value={bio} onChangeText={text => setBio(text)} style={{marginTop: 20, paddingTop: 10, height: 20}} multiline={true} />*/}
            {/*<Button title='Choose Profile Picture' onPress={profilePicChooser} style={styles.button} />*/}
            <TouchableOpacity onPress={signUp} style={{alignSelf: 'center'}}>
                <View style={{borderWidth: 0.2, height: 50, width: 130, backgroundColor: 'cadetblue'}} raised={true}>
                    <Text style={{color: 'white', textAlign: 'center', fontSize: 18, marginTop: 5}}>Sign Up</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                {/*<Text>Create An Organisation (Not functional As Of Now!)</Text>*/}
            </TouchableOpacity>
        </ScrollView>
    )
}

export default SignUp;

const styles = StyleSheet.create({
    input: {
        marginTop: 20,
        paddingTop: 10,
        borderWidth: 1,
        margin: 10,
        height: 50,
        borderRadius: 10
    },
    button: {
        marginTop: 50
    }
});