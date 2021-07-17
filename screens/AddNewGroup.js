import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import { ImagePickerIOS } from 'react-native';
import { ScrollView } from 'react-native';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
import { db } from '../firebase';
import firebase from 'firebase';
import SearchedUser from '../components/SearchUser';
import GroupAddingUser from '../components/GroupAddingUser';


function AddNewGroup() {
    const user = firebase.auth().currentUser;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('../assets/defaultPic.jpeg');
    const [photo, setPhoto] = useState('');
    const [searchUser, setSearchUser] = useState('');
    const [users, setUsers] = useState([]);
    const [user1, setUser1] = useState('');
    const [user2, setUser2] = useState('');
    const [user3, setUser3] = useState('');
    const [user4, setUser4] = useState('');
    const [user5, setUser5] = useState('');

    useEffect(() => {
        const unsub = db.collection('users').onSnapshot(snapshot => setUsers(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            }))
        ))
    }, [])

    async function addGroupPhoto() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [7, 10],
            quality: 1,
        })
        console.log(result);

        if (!result.cancelled) {
            let newFile = {
                uri: result.uri,
                type: `test/${result.uri.split('.')[1]}`,
                name: `test.png`,
            }
            setImage(result.uri);
            setPhoto(newFile);
        }
    }

    async function createGroup() {
        if (searchUser === '' || name === '' || description === '') {
            alert('Fill All the above fields!!');
        } else {
            // Create the group and add it to the db!
        }
    };

    function addUserToGrp() {};

    return (
        <ScrollView style={{flexDirection: 'column'}} contentContainerStyle={{justifyContent: 'center'}}>
            <View style={{marginLeft: 0, flexDirection: 'row', justifyContent: 'center', marginTop: 50}}>
                <TouchableOpacity onPress={addGroupPhoto}>
                    <Avatar rounded source={{uri: image}} size={120} />
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'column', justifyContent: 'center', margin: 10, marginTop: 20}}>
                <TextInput value={name} placeholder='Name of the Group' onChangeText={text => setName(text)} style={{borderWidth: 1,  borderRadius: 20, height: 50}} />
                <TextInput value={searchUser} placeholder='Search for Participants' onChangeText={text => setSearchUser(text)} style={{borderWidth:1, borderRadius: 20,marginTop: 10, height: 50}} />
                {users.map(({id, data}) => (
                    data.name === searchUser ? 
                        <ScrollView>
                            <TouchableOpacity onPress={addUserToGrp}>
                                <GroupAddingUser key={id} id={id} name={data.name} email={data.email} profilePic={data.profilePic} />
                            </TouchableOpacity>
                        </ScrollView>
                    : null))}
                <TextInput value={description} placeholder=' Description' onChangeText={text => setDescription(text)} multiline style={{textAlignVertical: 'top',borderWidth: 1, borderRadius: 20, height: 100,  marginTop: 10}} />
                <TouchableOpacity onPress={createGroup}>
                    <View style={{height: 50, borderWidth: 1, width: 130, marginTop: 50, alignSelf: 'center', borderRadius: 10}}>
                        <Text style={{textAlign: 'center', fontWeight: 'bold', marginTop: 10 }}>Create Group!</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default AddNewGroup;
