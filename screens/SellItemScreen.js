import React, { useLayoutEffect } from 'react'
import { View, Text, Image } from 'react-native'
import AddItem from './AddItem'

function SellItemScreen({navigation, id, image}) {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Item Page',
        })
    }, [navigation])

    return (
        <View>
            <Text>{id}</Text>
            <Image source={{uri: image}} style={{height: 50}} />
        </View>
    )
}

export default SellItemScreen;