import React, { useLayoutEffect } from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Avatar, ListItem } from 'react-native-elements';
import { UserInterfaceIdiom } from 'expo-constants';
import * as firebase from 'firebase';

function ChatItem({navigation}) {
    const user = firebase.auth().currentUser;

    return (
        <ListItem>
            
        </ListItem>
    )
};

export default ChatItem;