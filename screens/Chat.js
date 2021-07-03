import React, {useLayoutEffect} from 'react';
import { View, Text, ScrollView } from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import ChatItem from '../components/ChatItem';

function Chat({navigation}) {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{paddingRight: 10}}>
                    <AntDesign name='adduser' size={35} color='black' />
                </View>
            )
        })
    }, [navigation])

    return (
        <ScrollView>
            <ChatItem />
        </ScrollView>
    )
};

export default Chat;
