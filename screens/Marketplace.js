import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import {db, auth} from '../firebase';
import MarketItem from '../components/MarketItem';
import { UserInterfaceIdiom } from 'expo-constants';
import * as firebase from 'firebase';
import { makeStyles } from 'react-native-elements';

function Marketplace({navigation}) {
    const [items, setItems] = useState([]);

    const user = firebase.auth().currentUser;

    useEffect(() => {
        const items = [];
        db.collection('items').orderBy('timestamp', 'desc').get().then(snapshot => {
            snapshot.docs.forEach(item => {
                let currentId = item.id;
                let obj = {...item.data(), ['id']: currentId};
                items.push(obj);
                items.push(item.data());
            })
            setItems(items);
        })
    }, [])

    function navigateToAddItem() {
        navigation.navigate('AddItem');
    };

    function navigateToSellItem() {
        navigation.navigate('SellItemScreen');
    };

    return (
        <ScrollView>
            <View style={{backgroundColor: 'white', height: 50, borderBottomWidth: 0.3, flexDirection: 'row-reverse', justifyContent: 'space-between'}}>
                <TouchableOpacity style={{backgroundColor: 'cadetblue', borderRadius: 10, padding: 5}}>
                    <EvilIcons name="search" size={40} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToAddItem} style={{backgroundColor: 'red', padding: 3, borderRadius: 10}}>
                    <MaterialIcons name='add' size={45} color='white' />
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {items.map(item => (    
                    <MarketItem key={item.id} id={item.id} user={item.user} image={item.image} price={item.price} item={item.name} category={item.category} navigation={navigation} />
                ))}
                {/*<MarketItem item='Raspberry Pi' price='3000' image='https://www.raspberrypi.org/homepage-9df4b/static/bdc42b00ebe8f2312c4d229beb9325bf/43eee/7d247ace-afb2-4555-b7b3-4f236eb779d6_Raspberry%2BPi%2BPico%2B1.jpg' profilePic={user.photoURL} user={user.displayName}  />*/}
            </View>
        </ScrollView>
    )
};

export default Marketplace;
