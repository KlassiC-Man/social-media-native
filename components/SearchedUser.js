import React from 'react'
import { View, Text } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { ListItem } from 'react-native-elements/dist/list/ListItem';
import firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

function SearchedUser({id, name, profilePic}) {
    const user = firebase.auth().currentUser;

    function goIntoUsersProfile() {

    };

    return (
        <TouchableOpacity style={{display: 'flex', flexDirection: 'row'}} onPress={goIntoUsersProfile}>
            <View style={{borderWidth: 1,  flexDirection: 'row', flex: 1, borderRadius: 5, padding: 5}}>
                <Avatar source={{uri: profilePic}}  rounded size={45}  />
                <Text style={{paddingTop: 5, fontSize: 20, paddingLeft: 5}}>{name}</Text>
            </View>
        </TouchableOpacity>
        
    )
}

export default SearchedUser;