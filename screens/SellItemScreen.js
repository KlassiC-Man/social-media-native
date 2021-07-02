import React, { useLayoutEffect } from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import AddItem from './AddItem'

function SellItemScreen({navigation, route}) {
    const {id, item, image, price, category, timestamp} = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Item Page',
        })
    }, [navigation])

    return (
        <ScrollView>
            <Image source={{uri: image}} style={{height: 350}} />
            <Text style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center', fontFamily: 'Roboto', flexWrap: 'wrap'}} >{item}</Text>
            <Text style={{color: 'gray', marginTop: 10}}>Posted On : {timestamp}</Text>
        </ScrollView>
    )
}

export default SellItemScreen;