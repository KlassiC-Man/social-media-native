import React from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Friend({profilePic, name, id, phoneNo, email}) {
    return (
        <View style={{width: '100%'}}>
            <View style={{flexDirection: 'row'}}>
                <Avatar source={{uri: profilePic}} size={100} rounded />
                <Text style={{fontWeight: 'bold', fontSize: 25, marginLeft: 10, marginTop: 10}}>{name}</Text>
            </View>
            <View>
                <TouchableOpacity style={{backgroundColor: 'cadetblue'}}>
                    <Text>Follow</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Friend;
