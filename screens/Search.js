import React, {useEffect, Component} from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import {db, auth} from '../firebase';
import { AntDesign } from '@expo/vector-icons';
import SearchItem from '../components/SearchItem';
import * as firebase from 'firebase';

function Search({navigation}) {
    const [input, setInput] = React.useState('');
    const [users, setUsers] = React.useState([]);

    const collectionRef = db.collection('users');

    const test = firebase.auth().currentUser;

    useEffect(() => {
        const users = [];
        db.collection('users').get().then(snapshot => {
            snapshot.docs.forEach(user => {
                let currentId = user.id
                let obj = { ...user.data(), ['id']: currentId }
                users.push(obj);
                users.push(users.data())
            })
            setUsers(users);
        })
    }, [])

    function search() {
        
    };

    return (
        <View>
            <View style={{margin: 5, flexDirection: 'row'}}>
                <TextInput placeholder='  Search' style={{borderWidth: 1, height: 45, borderRadius: 20, flex: 1}} autoFocus={true} value={input} onChangeText={text => setInput(text)} />
                <TouchableOpacity onPress={search}>
                    <AntDesign name='search1' size={35} style={{paddingLeft: 3}} />
                </TouchableOpacity>
                {users.map(user => (
                    <SearchItem key={user.id} name={user.name} image={test.profilePic} />
                ))}
            </View>
        </View>
    )
}

export default Search;