import React, { useEffect, useLayoutEffect, useState } from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView, RefreshControl} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import {Avatar} from 'react-native-elements';
import {Button} from 'react-native-elements';
import {auth, db} from '../firebase';
import * as firebase from 'firebase';
import Post from '../components/Post';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

function Home({navigation}) {
    const [input, setInput] = useState('');
    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [users, setUsers] = useState([]);
    const [userFolls, setUserFolls] = useState([]);

    const user = firebase.auth().currentUser;

    // Wait function for the refresh state!
    function wait(timeout) {
        return new Promise(resolve => setTimeout(resolve, timeout));
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => setRefreshing(false));
    }, []);

    // useEffect for going through the posts and clicking snapshots!
    useEffect(() => {
        const unsubscribe = db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => setPosts(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }))
        ))
        posts.map(({id, data}) => {
            db.collection('users').doc(String(data.userId)).collection('followers').onSnapshot(snapshot => setUserFolls(
                snapshot.docs.map(doc => ({
                    follId: doc.id,
                    follData: doc.data(),
                }))
            ))
        })
    }, [])

    useEffect(() => {
        const unsub = db.collection('users').onSnapshot(snapshot => setUsers(
            snapshot.docs.map(doc => ({
                userId: doc.id,
                userData: doc.data(),
            }))
        ))
    }, [])

    function navigateToMarket() {
        navigation.navigate('Marketplace');
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => (
                <View style={{height: 0}}></View>
            ),
        })
    }, [navigation])

    function onFocus() {
        navigation.navigate('Post');
    };

    function goToSearchWindow() {
        navigation.navigate('Search');
    };

    function goToProfile() {
        navigation.navigate('UserProfile');
    };

    function navigateToChat() {
        navigation.navigate('Chat')
    };

    function navigateToMenu() {
        navigation.navigate('Menu');
    }

    return(
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor='#ddd' title='Pull to Refresh' />} style={{borderBottomWidth: 10, borderColor: 'lightgray', height: 75, borderRadius: 10, marginTop: 50}}>
            <View style={{flexDirection: 'row',}}>
                {/*<TouchableOpacity style={{margin: 10, marginTop: 0}}>
                    <Avatar rounded source={{uri: '../assets/main.jpeg'}} size={50} />
                </TouchableOpacity>*/}
                <Text style={{fontFamily: 'serif', fontSize: 30, paddingLeft: 20, color: '#2a9d8f'}}>Socialise</Text>
                <TouchableOpacity style={{margin: 10, marginTop: 0, marginLeft: 130}} onPress={navigateToChat}>
                    <Ionicons name='chatbox' color='black' size={40} />
                </TouchableOpacity>
                <TouchableOpacity onPress={goToSearchWindow} >
                    <AntDesign name='search1' size={30} />
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', borderBottomWidth: 1,}}>
                <TouchableOpacity >
                    <Entypo name='home' size={34} color='cadetblue' style={styles.headerLogo} />
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToMarket}>
                    <Entypo name='shop' size={34} color='black' style={styles.headerLogo} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('FindUsers')}>
                    <FontAwesome name='group' size={34} color='black' style={styles.headerLogo} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Feather name="airplay" size={34} color="black" style={styles.headerLogo} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Feather name="bell" size={34} color="black" style={styles.headerLogo} />
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToMenu}>
                    <Entypo name='menu' size={34} color='black' style={styles.headerLogo} />
                </TouchableOpacity>
            </View>
            <View style={{padding: 10, flexDirection: 'row'}}>
                <TouchableOpacity onPress={goToProfile}>
                    {<Avatar rounded source={{uri: user.photoURL}} size={47} />}
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
                {posts.map(({id, data}) => (
                    <Post id={id} key={id} image={data.image} profilePic={data.profilePic} message={data.message} user={data.user} />
                ))}        
            </View>
        </ScrollView>
    )
}

export default Home;

const styles =  StyleSheet.create({
    headerLogo: {
        marginLeft: 24,
        marginBottom: 5
    },  
});