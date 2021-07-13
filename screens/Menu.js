import React from 'react';
import { ScrollView } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign, Entypo } from '@expo/vector-icons';

function Menu({navigation}) {
    const user = firebase.auth().currentUser;

    function navigateToUserProfile() {
        navigation.navigate('UserProfile');
    }

    return (
        <ScrollView>
            <View style={{padding: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity style={{flexDirection: 'row'}} onPress={navigateToUserProfile}>
                    <Avatar source={{uri: user.photoURL}} rounded size={60} />
                    <Text style={{fontSize: 20, marginTop: 9, marginLeft: 2, fontWeight: 'bold'}}>{user.displayName}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{}}>
                    <AntDesign name='search1' color='black' size={40} />
                </TouchableOpacity>
            </View>
            <View style={{borderWidth: 2, marginTop: 10, margin: 10}} />
            <View style={{margin: 10, flexDirection: 'row', flexWrap: 'wrap'}}>
                <TouchableOpacity style={styles.widgets}>
                    <Entypo name='shop' size={34} color='black' style={styles.headerLogo} />
                    <Text style={{textAlign: 'center', fontSize: 20, marginTop: 17}}>Marketplace</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.widgets}>
                    <Text style={{textAlign: 'center', fontSize: 20, marginTop: 17}} multiline={true}>Find Friends</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.widgets}>
                    <Text style={{textAlign: 'center', fontSize: 20, marginTop: 17}}>Groups</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Menu;

const styles = StyleSheet.create({
    widgets: {
        borderWidth: 0.5,
        width: 160,
        borderRadius: 20,
        margin: 3,
        alignItems: 'center'
    }
})