import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import {Avatar} from 'react-native-elements';

function MarketItem({item, image, timestamp, price, category, navigation}) {
    return (
        <View style={{borderWidth:3, borderColor: 'white',  width: 160, borderRadius: 20, display: 'flex' , margin: 10 }}>
            <View>
                <Image source={{uri: image}} style={{height: 150, borderRadius: 20}} />
            </View>
            <View style={{flexDirection: 'row', display: 'flex', justifyContent: 'center'}}>
                <Text style={{textAlign: 'center', fontWeight: 'bold'}}>₹{price} - {item}</Text>
            </View>
            <View>
                <Text style={{ textAlign: 'center'}}>{category}</Text>
            </View>
        </View>
    )
};

export default MarketItem;
