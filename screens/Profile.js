import React, { useEffect, useLayoutEffect } from 'react'
import { ScrollView } from 'react-native';
import { View, Text ,Image } from 'react-native'
import { Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase';
import {db, auth} from '../firebase';
import Post from '../components/Post';

function Profile({route, navigation}) {
    const [follower, setFollower] = React.useState(0)
    const [usersPost, setUsersPost] = React.useState([]);
    const [usersFollowers, setUsersFollowers] = React.useState([]);
    const [foll, setFoll] = React.useState(false);

    const {id, name, profilePic, followers, following, email} = route.params;

    const user = firebase.auth().currentUser;

    function startFollowingUser() {
        db.collection('users').doc(id).collection('followers').doc(user.email).set({
            name: user.displayName,
            email: user.email,
            profilePic: user.photoURL,
        })
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: name
        })
    }, [route])


    useEffect(() => {
        db.collection('users').doc(id).collection('followers').get().then(snapshot => setFollower(snapshot.size));
    }, []);

    useEffect(() => {
        const unsubscribe = db.collection('posts').onSnapshot(snapshot => setUsersPost(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            }))
        ))
        return unsubscribe;
    }, [])

    useEffect(() => {
        const unsub = db.collection('users').doc(id).collection('followers').onSnapshot(snapshot => setUsersFollowers(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }))
        ))
        return unsub;
    }, [])

    useLayoutEffect(() => {
        usersFollowers.map(({id, data}) => {
            if (data.email === user.email) {
                setFoll(true);
            } else {
                setFoll(false);
            }
        })
    }, [])

    function unfollowUser() {
        db.collection('users').doc(id).collection('followers').doc(user.email).delete();
    }

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
            { foll === true ? (
                <View>
                    <TouchableOpacity style={{borderWidth: 0.2, height: 40, width: 240, marginLeft:120, borderRadius: 20, backgroundColor: 'lightgray'}} onPress={unfollowUser}>
                        <Text style={{textAlign: 'center', fontWeight: 'bold' ,fontFamily: 'serif', fontSize: 20, color: 'gray', marginTop: 3}}>Following</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={{display: 'flex'}}>
                    <TouchableOpacity style={{borderWidth: 0.2, height: 40, width: 240, marginLeft: 120, borderRadius: 20, backgroundColor: 'cadetblue'}} onPress={startFollowingUser}>
                        <Text style={{textAlign: 'center', fontWeight: 'bold', fontFamily: 'serif', fontSize: 20, color: 'white', marginTop: 3}}>Follow</Text>
                    </TouchableOpacity>
                </View>
                )}
            <View style={{backgroundColor: 'lightgray', borderWidth: 1, borderRightWidth: 0,borderLeftWidth: 0, marginTop: 50,height: 50, borderColor: 'gray'}}>
                <Text style={{textAlign: 'center', fontSize: 17, color:'gray', fontFamily: 'serif', paddingTop: 5}}>Posts from the User!</Text>
            </View>
            <View style={{marginTop: 20}}>
                {usersPost.map(({id, data}) => (
                    data.email === email ? 
                    <Post key={id} id={id} user={data.user} message={data.message} image={data.image} profilePic={data.profilePic} email={data.email} timestamp={data.timestamp} />
                : null))}
            </View>
        </ScrollView>
    )
}

export default Profile;