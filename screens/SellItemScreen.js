import React, { useLayoutEffect } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import AddItem from './AddItem';
import { Feather } from '@expo/vector-icons';

function SellItemScreen({navigation, route}) {
    const [message, setMessage] = React.useState('');

    const {id, item, image, price, category, timestamp, user} = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Item Page',
        })
    }, [navigation])

    function sendSellerMsg() {
        
    }

    return (
        <ScrollView style={{marginLeft: 5, marginRight: 5}}>
            <View style={{}}>
                <Image source={{uri: image}} style={{height: 350}} />
            </View>
            <View style={{marginLeft: 5}}>
                <Text style={{fontSize: 30, fontWeight: 'bold', fontFamily: 'Roboto', flexWrap: 'wrap'}} >{item}</Text>
                <Text style={{marginTop: 40 , color: 'gray'}}>Send The Seller A Message:</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <TextInput placeholder='Your Message To the Seller..' style={{borderWidth: 1, flex: 1, height: 40, borderRadius: 15}} value={message} onChangeText={text => setMessage(text)} />
                <TouchableOpacity onPress={sendSellerMsg} style={{padding: 3}}>
                    <Feather name='send' size={30} color='cadetblue' />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default SellItemScreen;