import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native';
import { db } from '../firebase';
import SearchUser from '../components/SearchUser';

function AddNewChat() {
    const [input, setInput] = React.useState('');
    const [users, setUsers] = React.useState([]);

    /*useEffect(() => {
        const searchItems = [];
        db.collection('users').get().then(snapshot => {
            snapshot.docs.forEach(user => {
                let currentId = user.id
                let obj = { ...user.data(), ['id']: currentId }
                searchItems.push(obj);
                searchItems.push(user.data())
            })
            setUsers(searchItems);
        })
    }, [input])*/

    useEffect(() => {
        const unsubscribe = db.collection('users').onSnapshot(snapshot => setUsers(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            }))
        ))
    }, [input])

    return (
        <View>
            <TextInput placeholder='Name Of The User' style={{borderWidth: 1, margin: 5, height: 50, borderRadius: 10}} value={input} onChangeText={text => setInput(text)} />
            {users.map(({id, data}) => (
                data.name === input ? 
                <SearchUser name={input} profilePic={data.profilePic} key={id} id={id} email={data.email} />
            : null))}
        </View>
    )
}

export default AddNewChat;