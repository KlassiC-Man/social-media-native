import React, {useEffect, Component} from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import {db, auth} from '../firebase';
import { AntDesign } from '@expo/vector-icons';
import SearchItem from '../components/SearchItem';
import * as firebase from 'firebase';

function Search({navigation}) {
    const [input, setInput] = React.useState('');
    const [users, setUsers] = React.useState([]);

    // a reference to the 'users' collection.
    const collectionRef = db.collection('users');

    // the current user
    const test = firebase.auth().currentUser;

    useEffect(() => {
	db.collection('users').onSnapshot((snapshot) => 
		setUsers(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
	);
    }, [])

    function search() {
        if (input in users) {
		console.log('Good!');
	} else {
		console.log('Not Working!');
	}
    };

    return (
        <View>
            <View style={{margin: 5, flexDirection: 'row'}}>
                <TextInput placeholder='  Search' style={{borderWidth: 1, height: 45, borderRadius: 20, flex: 1}} autoFocus={true} value={input} onChangeText={text => setInput(text)} />
                <TouchableOpacity onPress={search}>
                    <AntDesign name='search1' size={35} style={{paddingLeft: 3}} />
                </TouchableOpacity>
                {/*users.map(user => (
                    <SearchItem key={user.id} name={user.name} image={test.profilePic} />
                ))*/}
            </View>
        </View>
    )
}

export default Search;
