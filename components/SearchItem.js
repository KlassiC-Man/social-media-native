import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import {AntDesign} from '@expo/vector-icons';

function SearchItem({image, name}) {
    return (
        <View style={{marginTop: 0, marginLeft: 5}}>
            <View style={{borderBottomWidth: 0.5, height: 60, borderTopWidth: 0.5, borderColor: 'lightgray', justifyContent: 'center', flexDirection: 'row'}} >
                <Avatar rounded source={{uri: image}} size={50}  />
                <Text style={{fontSize: 18, paddingLeft: 9, marginRight: 120, marginTop: 8}}>{name}</Text>
                <TouchableOpacity>
                    <AntDesign name='adduser' size={40} style={{marginTop: 10}} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SearchItem;
