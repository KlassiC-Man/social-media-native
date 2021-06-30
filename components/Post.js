import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import {db, storage, auth} from '../firebase';
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';

function Post({user, email, message, image, profilePic, timestamp}) {
    return (
        <View style={{borderWidth: 0.2, margin: 10, flexDirection: 'column'}}>
            <View style={{margin: 5, flexDirection: 'row', flex: 1}}>
                <Avatar rounded source={{uri: profilePic}} size={45} />
                <Text style={{marginTop: 10, fontWeight: 'bold', marginLeft: 5, fontSize: 17}}>{user}</Text>
                {/*<Text style={{paddingTop: 50, flex: 1, justifyContent: 'flex-start'}} multiline={true}>{message}</Text>*/}
            </View>
            <View style={{flexDirection: 'column'}}>
                <Text multiline={true} style={{fontSize: 16}}>{message}</Text>
                {image !== '' ? <Image style={{height: 400}} source={{uri: image}} /> : null}
            </View>
            <View style={{paddingTop: 2, borderWidth: 0.2, height: 45, justifyContent: 'space-evenly', flex: 0.50, flexDirection: 'row'}}>
                <TouchableOpacity>
                    <AntDesign name='like2' size={35} color='cadetblue' />
                </TouchableOpacity>
                <TouchableOpacity>
                    <EvilIcons name="comment" size={43} color="cadetblue" />
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default Post;