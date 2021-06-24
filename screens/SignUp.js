import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, { useState } from 'react';
import {KeyboardAvoidingView, ScrollView, StyleSheet, View} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {auth, db} from '../firebase';

function SignUp({navigation}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [bio, setBio] = useState('');

    function signUp() {
        auth.createUserWithEmailAndPassword(email, password).then(authUser => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl || require('../assets/default.png'),
                bio: bio,
            })
        }).catch(error => alert(error));
    };

    return (
        <ScrollView>
            <Input type='text' placeholder='Username' value={name} onChangeText={text => setName(text)} style={styles.input} />
            <Input type='email' placeholder='E-Mail' value={email} onChangeText={text => setEmail(text)} style={styles.input} />
            <Input type='password' placeholder='password' value={password} secureTextEntry onChangeText={text => setPassword(text)} style={styles.input} />
            <Input type='text' placeholder='Image URL for Profile (Optional) .png or .jpeg links' onChangeText={text => setImageUrl(text)} style={styles.input} value={imageUrl} />
            {/*<Input type='text' placeholder='Bio' value={bio} onChangeText={text => setBio(text)} style={{marginTop: 20, paddingTop: 10, height: 20}} multiline={true} />*/}
            <Button title='Choose Profile Picture' onPress={profilePicChooser} style={styles.button} />
            <Button title='Sign Up!' onPress={signUp} raised style={styles.button} />
        </ScrollView>
    )
}

export default SignUp;

const styles = StyleSheet.create({
    input: {
        marginTop: 20,
        paddingTop: 10
    },
    button: {
        marginTop: 50
    }
});