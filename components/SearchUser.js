import {Text, StyleSheet, View} from 'react-native';
import React from 'react';
import { ListItem } from 'react-native-elements/dist/list/ListItem';
import {Avatar} from 'react-native-elements';
import firebase from 'firebase';
import {db, auth} from '../firebase';

function SearchUser({name, profilePic, id, navigation}) {
    const user = firebase.auth().currentUser;

    async function enterChat() {
        let chatter1 = await db.collection('users').doc(id).get()
        let data = chatter1.data();
        db.collection('chats').add({
            chatter0: user.email,
            chatter1: data.email,
            chatterName0: user.displayName,
            chatterName1: data.name,
            chatterProfile0: user.photoURL,
            chatterProfile1: data.profilePic,
        }).then(
            navigation.navigate('Chat')
        )
    }
    
    return (
        <ListItem onPress={enterChat} bottomDivider>
            <Avatar source={{uri: profilePic}} rounded size={50} />
            <Text style={{fontSize: 15}}>{name}</Text>
        </ListItem>
    )
};

export default SearchUser;