import React, { useLayoutEffect } from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Avatar, ListItem } from 'react-native-elements';
import { UserInterfaceIdiom } from 'expo-constants';
import * as firebase from 'firebase';

function ChatItem({navigation}) {
    const user = firebase.auth().currentUser;

    function enterTheChat() {
        console.log('Click Success!');//Have to modify this function for entering the chat and seeing the messages!!
    };

    return (
        <ListItem bottomDivider onPress={enterTheChat}>
            <Avatar rounded source={{uri: user.photoURL}} size={50} />
            <ListItem.Content>
                <ListItem.Title>
                    {user.displayName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail' style={{color: 'gray'}}>
                    Test Message!!
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
};

export default ChatItem;