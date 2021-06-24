import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, KeyboardAvoidingView, Image} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {auth, db} from '../firebase';

function Login({navigation}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
          console.log(authUser);
          if (authUser) {
            navigation.replace("Home");
          }
        });
    
        return unsubscribe;
      }, [])

    function login() {
        auth.signInWithEmailAndPassword(email, password).catch(error => alert(error));
    };

    function signUp() {
        navigation.navigate('SignUp');
    };

    return (
        <KeyboardAvoidingView behavior='height' style={styles.container}>
            <Input type='text' placeholder='Username' value={name} onChangeText={(text) => setName(text)} style={styles.input} />
            <Input type='email' placeholder='E-Mail' value={email} onChangeText={(text) => setEmail(text)} style={styles.input} />
            <Input type='password' placeholder='Password' secureTextEntry value={password} onChangeText={(text) => setPassword(text)} style={styles.input}/>
            <Button title='Login' raised onPress={login} style={styles.button} />
            <Button title='Sign Up' type='clear' onPress={signUp} style={styles.button} />
        </KeyboardAvoidingView>

    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },  
    input: {
        marginTop: 10
    },
    button : {
        paddingTop: 20
    },
})