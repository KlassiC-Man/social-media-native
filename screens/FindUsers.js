import React, { useEffect, useLayoutEffect } from 'react';
import * as Contacts from 'expo-contacts';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Friend from '../components/Friend';
import firebase from 'firebase';

function FindUsers({navigation}) {
    const user = firebase.auth().currentUser;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Find Friends',
        })    
    }, [navigation])

    useEffect(() => {
        (async () => {
          const { status } = await Contacts.requestPermissionsAsync();
          if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
              fields: [Contacts.Fields.Emails, Contacts.PHONE_NUMBERS],
            });
    
            if (data.length > 0) {
              const contact = data[10];
              console.log(contact.phoneNumbers[0]?.number);
            }
          }
        })();
      }, []);

    return (
        <ScrollView style={{flexDirection: 'column', margin: 5}}>
            <Friend profilePic={user.photoURL} name={user.displayName} />
        </ScrollView>
    )
}

export default FindUsers
