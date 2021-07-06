import React from 'react'
import { View, Text } from 'react-native'

function ChatScreen({route}) {
    const {id} = route.params;
    return (
        <View>
            <Text>{id}</Text>
        </View>
    )
}

export default ChatScreen;