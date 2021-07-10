import React, {useEffect, Component} from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import {db, auth} from '../firebase';
import { AntDesign } from '@expo/vector-icons';
import SearchItem from '../components/SearchItem';
import * as firebase from 'firebase';
import SearchedUser from '../components/SearchedUser';

function Search({navigation}) {
    const [input, setInput] = React.useState('');
    const [users, setUsers] = React.useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('users').onSnapshot(snapshot => setUsers(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            }))
        ))
        return unsubscribe;
    }, [input])

    function search() {
	let whatWeNeed = db.collection('users').doc(input);
    	console.log(whatWeNeed);
    };

    return (
        <View>
            <View style={{margin: 5, flexDirection: 'column'}}>
	    	<View style={{margin: 5, flexDirection: 'row'}}>	
	        	<TextInput placeholder='  Search' style={{borderWidth: 1, height: 45, borderRadius: 20, flex: 1}} autoFocus={true} value={input} onChangeText={text => setInput(text)} />
                	<TouchableOpacity onPress={search}>
                    		<AntDesign name='search1' size={35} style={{paddingLeft: 3}} />
                	</TouchableOpacity>
	    	</View>
                {users.map(({id, data}) => (
                    data.name.toLowerCase() === input.toLowerCase() ? 
                    <SearchedUser profilePic={data.profilePic} id={id} name={data.name} />
                : null))}
            </View>
        </View>
    )
}

export default Search;
