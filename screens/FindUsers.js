import React, { useEffect, useLayoutEffect, useState } from 'react';
import * as Contacts from 'expo-contacts';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Friend from '../components/Friend';
import firebase from 'firebase';
import { set } from 'react-native-reanimated';
import { db } from '../firebase';

function FindUsers({navigation}) {
    const [usersContacts, setUsersContacts] = useState([]);
    const [users, setUsers] = useState([]);

    const user = firebase.auth().currentUser;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Find Friends',
        })    
    }, [navigation])

    useEffect(() => {
      db.collection('users').onSnapshot(snapshot => setUsers(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        }))
      ))
    }, [])

    useEffect(() => {
        (async () => {
          const { status } = await Contacts.requestPermissionsAsync();
          if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
              fields: [Contacts.Fields.Emails, Contacts.PHONE_NUMBERS],
            });
          console.log(data);
          setUsersContacts(data);// Still working right here... will continue tomorrow!!
          }
        })();
      }, []);

    return (
        <ScrollView style={{flexDirection: 'column', margin: 1}}>
            <Friend profilePic={user.photoURL} name={user.displayName} />
        </ScrollView>
    )
}

export default FindUsers
