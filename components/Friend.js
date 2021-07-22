import React from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { ListItem } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Friend({profilePic, name, id, phoneNo, email}) {
    return (
        <ListItem bottomDivider id={id} style={{}}>
            <Avatar rounded source={{uri: profilePic}} size={80} />
            <ListItem.Content>
                <ListItem.Title style={{fontSize: 20, marginBottom: 5}}>
                    {name}    
                </ListItem.Title>
                <ListItem.Subtitle>
                    <TouchableOpacity style={{backgroundColor: 'cadetblue', height: 35, width: 100, borderRadius: 10}}>
                        <Text style={{color: 'white', textAlign: 'center', fontSize: 17}}>Follow</Text>
                    </TouchableOpacity>   
                    <View style={{height: 0, width: 5}} />
                    <TouchableOpacity style={{borderRadius: 10, backgroundColor: 'white', borderWidth: 1, borderColor: 'cadetblue', height: 35, width: 100}}>
                        <Text style={{color: 'cadetblue', textAlign: 'center', fontSize: 17}}>Visit</Text>
                    </TouchableOpacity>
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default Friend;
