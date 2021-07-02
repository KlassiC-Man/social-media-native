import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {Avatar} from 'react-native-elements';

function MarketItem({item, image, timestamp, price}) {
    return (
        <TouchableOpacity style={{borderWidth:3, borderColor: 'white',  width: 160, borderRadius: 20, display: 'flex' , margin: 10 }}>
            <View>
                <Image source={{uri: image}} style={{height: 150, borderRadius: 20}} />
            </View>
            <View style={{flexDirection: 'row'}}>
                <Text>₹{price}</Text>
                <Text style={{ fontSize: 15, fontFamily: 'Roboto'}}> - {item}</Text>
            </View>
        </TouchableOpacity>
    )
};

export default MarketItem;
