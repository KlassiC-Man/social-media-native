import React, { useEffect } from 'react'
import { ScrollView } from 'react-native';
import { View, Text ,Image } from 'react-native'
import { Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase';
import {db, auth} from '../firebase';

function Profile({route, navigation}) {
    const [follower, setFollower] = React.useState(0)

    const {id, name, profilePic, followers, following, email} = route.params;

    const user = firebase.auth().currentUser;

    function startFollowingUser() {
        db.collection('users').doc(id).collection('followers').add({
            name: user.displayName,
            email: user.email,
            profilePic: user.photoURL,
        })
    };

    useEffect(() => {
        db.collection('users').doc(id).collection('followers').get().then(snapshot => setFollower(snapshot.size));
    }, [])

    return (
        <ScrollView>
            <View style={{display: 'flex', flexDirection: 'row'}}>
                <View style={{padding: 10}}>
                    <Avatar rounded size={120} source={{uri: profilePic}}  />
                </View>
                <View>
                    <Text style={{fontSize: 30, color:'black', paddingTop: 20}}>{name}</Text>
                    <Text style={{color: 'gray'}}>Followers: {follower}</Text>
                </View>
            </View>
            { user.email !== email ? <View style={{display: 'flex'}}>
                <TouchableOpacity style={{borderWidth: 0.2, height: 40, width: 240, marginLeft: 120, borderRadius: 20, backgroundColor: 'cadetblue'}} onPress={startFollowingUser}>
                    <Text style={{textAlign: 'center', fontWeight: 'bold', fontFamily: 'serif', fontSize: 20, color: 'white', marginTop: 3}}>Follow</Text>
                </TouchableOpacity>
            </View> : null}
        </ScrollView>
    )
}

export default Profile;