import React, { useLayoutEffect } from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Avatar, ListItem } from 'react-native-elements';
import { UserInterfaceIdiom } from 'expo-constants';
import * as firebase from 'firebase';

function ChatItem({navigation, name, lastMsg, chatProfilePic, id}) {
    const user = firebase.auth().currentUser;

    function enterTheChat() {
        navigation.navigate('ChatScreen', {
            id: id,
        })
    };

    return (
        <ListItem bottomDivider onPress={enterTheChat}>
            <Avatar rounded source={{uri: chatProfilePic}} size={50} />
            <ListItem.Content>
                <ListItem.Title>
                    {name}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail' style={{color: 'gray'}}>
                    {lastMsg}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
};

export default ChatItem;