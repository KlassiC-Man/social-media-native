import React, { useLayoutEffect } from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import AddItem from './AddItem'

function SellItemScreen({navigation, route}) {
    const {id, item, image, price, category, timestamp, user} = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Item Page',
        })
    }, [navigation])

    return (
        <ScrollView>
            <View style={{}}>
                <Image source={{uri: image}} style={{height: 350}} />
            </View>
            <View style={{marginLeft: 5}}>
                <Text style={{fontSize: 30, fontWeight: 'bold', fontFamily: 'Roboto', flexWrap: 'wrap'}} >{item}</Text>
                <Text style={{marginTop: 20 , color: 'gray'}}>Send The Seller A Message:</Text>
                <TextInput placeholder='Your Message To the Seller..' style={{borderWidth: 1, height: 40, borderRadius: 15}} />
            </View>
        </ScrollView>
    )
}

export default SellItemScreen;