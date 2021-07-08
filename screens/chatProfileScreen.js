import React from 'react';
import { View, Text, Image } from 'react-native';

function chatProfileScreen({route}) {
    const {chatProfilePic} = route.params;

    return (
        <View style={{backgroundColor: 'black', height: '100%'}}>
            <Image source={{uri: chatProfilePic}} style={{height: '100%'}} />
        </View>
    )
}

export default chatProfileScreen;