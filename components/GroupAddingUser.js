import React from 'react'
import { View, Text } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { ListItem } from 'react-native-elements/dist/list/ListItem';
import firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

function GroupAddingUser({id, name, profilePic, navigation, followers, following, email}) {
    const user = firebase.auth().currentUser;

    return (
        <TouchableOpacity style={{display: 'flex', flexDirection: 'row'}}>
            <View style={{ flexDirection: 'row', flex: 1, borderRadius: 5, padding: 5}}>
                <Avatar source={{uri: profilePic}}  rounded size={45}  />
                <Text style={{paddingTop: 5, fontSize: 20, paddingLeft: 5}}>{name}</Text>
            </View>
        </TouchableOpacity>
        
    )
}

export default GroupAddingUser;