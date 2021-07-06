import React, {useEffect, useLayoutEffect, useState} from 'react';
import { View, Text, ScrollView } from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import ChatItem from '../components/ChatItem';
import { db } from '../firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { UserInterfaceIdiom } from 'expo-constants';
import firebase from 'firebase';

function Chat({navigation}) {
    const [chats, setChats] = useState([]);

    const user = firebase.auth().currentUser;

    useEffect(() => {
        const chats = [];
        db.collection('chats').get().then(snapshot => {
            snapshot.docs.forEach(chat => {
                let currentId = chat.id
                let obj = { ...chat.data(), ['id']: currentId }
                chats.push(obj);
                chats.push(chat.data())
            })
            setChats(chats);
        })
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{paddingRight: 10}}>
                    <TouchableOpacity onPress={addChat}>
                        <AntDesign name='adduser' size={35} color='black' />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    function addChat() {
        navigation.navigate('AddNewChat');
    };

    return (
        <ScrollView>
            {chats.map(chat => (
                chat.chatter1 === user.email || chat.chatter0 === user.email ?
                <ChatItem id={chat.id} navigation={navigation} name={chat.chatterName1 === user.displayName ? chat.chatterName0 : chat.chatterName1} chatProfilePic={chat.chatter1 === user.email ? chat.chatterProfile0 : chat.chatterProfile1} lastMsg='Hello, THis is a test!' />
            :null))}
        </ScrollView>
    )
};

export default Chat;
