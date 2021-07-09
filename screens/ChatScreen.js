import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { ScreenStackHeaderLeftView } from 'react-native-screens';
import { Ionicons, Feather } from '@expo/vector-icons';
import { db } from '../firebase';
import { UserInterfaceIdiom } from 'expo-constants';
import firebase from 'firebase';
//import {Editor} from '@tinymce/tinymce-react';

function ChatScreen({route, navigation}) {
    const [chatMsgs, setChatMsgs] = useState([]);
    const [input, setInput] = useState('');

    const user = firebase.auth().currentUser;

    const {id, name, lastMsg, chatProfilePic} = route.params;

    function showTheProfile() {
      navigation.navigate('ChatProfileScreen', {
        chatProfilePic: chatProfilePic,
      });
    };

    // this useLayoutEffect changes the layout of the screens navigation as soon as the screen is rendered
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: 'Chats',
            title: name,
            headerTitle: (() => (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity style={{flexDirection: 'row' ,alignItems: 'center'}} onPress={showTheProfile}>
                    <Avatar rounded source={{uri: chatProfilePic}} size={40} />
                  </TouchableOpacity>
                  <Text style={{fontSize: 17, paddingLeft: 10}}>{name}</Text>
                </View>
            ))
        })
    }, [navigation])

    // This useEffect gets all the messages for the chats you are in!!!
    useEffect(() => {
        const unsubscribe = db.collection('chats').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => setChatMsgs(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }))
        ));
        return unsubscribe;
    }, [route])

    // Function for sending the message you have typed
    function sendMsg() {
        db.collection('chats').doc(id).collection('messages').add({// Adds the message to the db
            timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
            message: input,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
        })
        // After the message is sent, set The message input field to '' or nothing!
        setInput('');
    };
    

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.container__main} behavior='height'>
            <>
            <ScrollView contentContainerStyle={{paddingTop:10}}>
                {chatMsgs.map(({id, data}) => (
                data.email === user.email ? (
                  <TouchableOpacity >
                    <View key={id} style={styles.recieved}>
                        <Avatar source={{uri: data.photoURL}} rounded size={25} position='absolute' bottom={30} right={-5} />
                        <Text style={styles.recievedMsg}>{data.message}</Text>
                    </View>
                  </TouchableOpacity>
                ):(
                    <View key={id} style={styles.sent}>
                        <Avatar source={{uri: data.photoURL}} rounded size={25} position='absolute' bottom={60} right={-5} />
                        <Text style={styles.sentMsg}>{data.message}</Text>
                        <Text style={styles.sender}>{data.displayName}</Text>
                    </View>
                )
                ))}
            </ScrollView>
            <View style={styles.mainArea}>
                <TextInput placeholder='Type The Message' placeholderTextColor='grey' style={styles.textInput} value={input} onChangeText={(text) => setInput(text)} />
                <TouchableOpacity onPress={sendMsg} disabled={!input}>
                    <Feather name='send' size={32} color='#3c6e71' />
                </TouchableOpacity>
            </View>
            </>
        </View>
        </SafeAreaView>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
  headingText: {
    color: 'white',
    marginLeft: 10,
    fontWeight: '700',
  },
  recieved: {
    padding: 15,
    backgroundColor: '#3c6e71',
    alignSelf: "flex-end",
    borderRadius: 10,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative',
  },
  recievedMsg: {
    color: '#fff',
    fontWeight: '500',
    marginLeft: 10,
  },
  sent: {
    padding: 15,
    backgroundColor: '#2c7da0',
    alignSelf: 'flex-start',
    borderRadius: 20,
    margin: 15,
    maxWidth: '80%',
    position: 'relative',
  },
  sentMsg: {
    color: 'white',
    fontWeight: '500',
    marginLeft: 10,
    marginBottom: 15,
  },
  sender: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: 'wheat',
  },
  container: {
    backgroundColor: '#48cae4',
    flex: 1,
  },
  container__main: {
    flex: 1,
  },
  mainArea: {
    flexDirection: 'row',
    padding: 10,
    width: '100%',
    justifyContent: 'center',
  },
  textInput: {
    color: 'black',
    bottom: 0,
    height: 45,
    flex: 1,
    marginRight: 15,
    marginLeft: 0,
    borderColor: "transparent",
    backgroundColor: '#fff',
    borderWidth: 1,
    padding: 8,
    borderRadius: 25,
  },
});