import React, { useLayoutEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TextInput, Picker, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import {db, auth} from '../firebase';
import * as firebase from 'firebase';
import {Button} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { useNavigationBuilder } from '@react-navigation/core';
import { FontAwesome } from '@expo/vector-icons';

function AddItem({navigation}) {
    const [image, setImage] = useState('');
    const [photo, setPhoto] = useState('');
    //The Text Inputs and other fields values and states are below!!!
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    // The default for category!
    const [category, setCategory] = useState('Electronics');
    const [condition, setCondition] = useState('New');

    const user = firebase.auth().currentUser;

    async function pickImage() {
        const result = await ImagePicker.launchImageLibraryAsync({
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
                name: `test.png`
            }
            setImage(result.uri);
            setPhoto(newFile);
        }
    };

    function addNewItem() {
        if (photo !== '') {
            const data = new FormData();
            data.append('file', photo);
            data.append('upload_preset', 'pfrzfrnr');
            data.append('cloud_name', 'dyin2a2pd');
            fetch('https://api.cloudinary.com/v1_1/dyin2a2pd/image/upload/', {
                method: 'post',
                body:data
            }).then(res => res.json()).then(data => {
                db.collection('items').add({
                    user: user.displayName,
                    email: user.email,
                    name: name,
                    price: price,
                    category: category,
                    condition: condition,
                    description: description,
                    image: data.secure_url,
                    timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                })
            }).then(
                navigation.replace('Marketplace')
            )
        } else {
            db.collection('items').add({
                user: user.displayName,
                email: user.email,
                name: name,
                price: price,
                category: category,
                condition: condition,
                description: description,
                timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                profilePic: user.photoURL,
            }).then(
                navigation.replace('Marketplace')
            )
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add Item Listing'
        })
    }, [navigation])

    return (
        <ScrollView>
            <View style={{margin: 8, flexDirection: 'row'}}>
                <Avatar rounded source={{uri: user.photoURL}} size={50} />
                <Text style={{fontSize: 19, marginLeft: 3, fontFamily: 'Roboto'}}>{user.displayName}</Text>
                <TouchableOpacity style={{marginTop: 10, marginLeft: 200}} onPress={addNewItem}>
                    <FontAwesome name='send' size={30} />
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'column', margin: 5}}>
                {image === '' ? <Button title='Add Photo' type='outline' style={{height: 70, margin: 10}} onPress={pickImage} /> : <Image source={{uri: image}} style={{height: 300, width: 350}} />}
                <TextInput placeholder=' Name' style={{borderWidth: 1, margin: 5, height: 60, borderRadius: 10, borderColor: 'gray', marginTop: 15}} value={name} onChangeText={text => setName(text)} />
                <TextInput placeholder=' Price' style={{borderWidth: 1, margin: 5, height: 60, borderRadius: 10, borderColor: 'gray'}} value={price} onChangeText={text => setPrice(text)} />
                <Picker selectedValue={category} onValueChange={(itemValue, itemIndex) => setCategory(itemValue)} style={{marginTop:10}} >
                    <Picker.Item label='Electronics' value='Electronics' />
                    <Picker.Item label='Home Accessory' value='Home Accessory' />
                    <Picker.Item label='Toys & Kids' value='Toys & Kids' />
                    <Picker.Item label='Motor Accessories' value='Motor Accessories' />
                    <Picker.Item label='Clothing' value='Clothing' />
                </Picker>
                <Picker selectedValue={condition} onValueChange={(itemValue, itemIndex) => setCondition(itemValue)} style={{marginTop: 10}}>
                    <Picker.Item label='New' value='New' />
                    <Picker.Item label='Used-Fairly New' value='Used-Fairly New' />
                    <Picker.Item label='Old' value='Old' />
                </Picker>
                <TextInput placeholder='Description' style={{borderWidth: 1, borderColor: 'gray' ,borderRadius: 10, height: 100, marginTop: 30}} textAlignVertical='top' multiline={true} value={description} onChangeText={text => setDescription(text)} />
            </View>
        </ScrollView>
    )
};

export default AddItem;
