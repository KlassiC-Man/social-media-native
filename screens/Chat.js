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
        const unsubscribe = db.collection('chats').onSnapshot(snapshot => setChats(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }))
        ))
    }, [])

    function addGroup() {
        navigation.navigate('AddNewGroup');
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{paddingRight: 10, flexDirection: 'row'}}>
                    <TouchableOpacity onPress={addChat} style={{marginRight: 20}}>
                        <AntDesign name='adduser' size={35} color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={addGroup}>
                        <AntDesign name="addusergroup" size={35} color="black" />
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
            {chats.map(({id, data}) => (
                data.chatter1 === user.email || data.chatter0 === user.email ?
                <ChatItem id={id} navigation={navigation} name={data.chatterName1 === user.displayName ? data.chatterName0 : data.chatterName1} chatProfilePic={data.chatter1 === user.email ? data.chatterProfile0 : data.chatterProfile1} lastMsg='Hello, THis is a test!' />
            :null))}
        </ScrollView>
    )
};

export default Chat;
