import React, {useEffect} from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import {db, auth} from '../firebase';
import { AntDesign } from '@expo/vector-icons';

function Search() {
    const [input, setInput] = React.useState('');
    const [users, setUsers] = React.useState([]);

    const collectionRef = db.collection('users');

    useEffect(() => {
        db.collection('users').onSnapshot(snapshot => {
            setUsers(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        });
    }, []);

    function search() {
        let finder = db.collection('users').doc(input);
        console.log(finder.za);
    }

    return (
        <View style={{margin: 5, flexDirection: 'row'}}>
            <TextInput placeholder='  Search' style={{borderWidth: 1, height: 45, borderRadius: 20, flex: 1}} autoFocus={true} value={input} onChangeText={text => setInput('' + text)} />
            <TouchableOpacity onPress={search}>
                <AntDesign name='search1' size={35} style={{paddingLeft: 3}} />
            </TouchableOpacity>
        </View>
    )
}

export default Search;