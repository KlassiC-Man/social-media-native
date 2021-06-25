import React, { useEffect, useLayoutEffect, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import {Avatar} from 'react-native-elements';
import {Button} from 'react-native-elements';
import {auth, db} from '../firebase';
import * as firebase from 'firebase';
import Post from '../components/Post';

function Home({navigation}) {
    const [input, setInput] = useState('');
    const [posts, setPosts] = useState([]);

    const user = firebase.auth().currentUser;

    // useEffect for going through the posts and clicking snapshots!
    useEffect(() => {
        const posts = [];
        db.collection('posts').get().then(snapshot => {
            snapshot.docs.forEach(post => {
                let currentId = post.id
                let obj = { ...post.data(), ['id']: currentId }
                posts.push(obj);
                posts.push(post.data())
            })
            setPosts(posts);
        })
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: '',
            headerLeft: () => (// doesnt work in one touchableopacity!!!!! Have to try with different views!
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity>
                        <Entypo name='home' size={34} color='black' style={styles.headerLogo} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Entypo name='shop' size={34} color='black' style={styles.headerLogo} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome name='group' size={34} color='black' style={styles.headerLogo} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Feather name="airplay" size={34} color="black" style={styles.headerLogo} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Feather name="bell" size={34} color="black" style={styles.headerLogo} />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    function onFocus() {
        navigation.navigate('Post');
    };

    function goToProfile() {
        navigation.navigate('UserProfile');
    };

    return(
        <ScrollView style={{borderBottomWidth: 10, borderColor: 'lightgray', height: 75, borderRadius: 10}}>
            <View style={{padding: 10, flexDirection: 'row'}}>
                <TouchableOpacity onPress={goToProfile}>
                    <Avatar rounded source={{uri: user.photoURL}} size={47} />    
                </TouchableOpacity>
                <TextInput onFocus={onFocus} value={input} placeholder='  Whats Up?' style={{borderWidth: 1, marginLeft: 10, borderColor: 'lightgray', borderRadius: 25, flex: 1}} />
            </View>
            <View style={{height: 100, marginBottom: 2,margin: 10, marginLeft: 2, marginRight: 2, flexDirection: 'row' ,borderBottomWidth: 10, borderColor: 'lightgray'}}>
                <Avatar rounded size={60} source={{uri: user.photoURL}} />
                <Avatar rounded size={60} source={{uri: user.photoURL}}/>
                <Avatar rounded size={60} source={{uri: user.photoURL}}/>
                <Avatar rounded size={60} source={{uri: user.photoURL}}/>
                <Avatar rounded size={60} source={{uri: user.photoURL}}/>
                <Avatar rounded size={60} source={{uri: user.photoURL}}/>
            </View>
            <View>
                {posts.map(post => (
                    <Post key={post.id} user={user.displayName} profilePic={post.profilePic} message={post.message} image={post.image} />
                ))}
                <Post profilePic={user.photoURL} user={user.displayName} message='Hello, Friends how is it going I am in london!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!' image={user.photoURL} timestamp='18 June 2021 at 12:25:06 UTC+5:30' />
                <Post profilePic={user.photoURL} user={user.displayName} message='Hello, Friends how is it going I am in london!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!' image='https://i.pinimg.com/originals/28/e5/cd/28e5cdc21f8ff8aae148932e4e6afafe.png' timestamp='18 June 2021 at 12:25:06 UTC+5:30' />
            </View>
        </ScrollView>
    )
}

export default Home;

const styles =  StyleSheet.create({
    headerLogo: {
        marginLeft: 30,
    },  
});