import React from 'react';
import { ScrollView } from 'react-native';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign, Entypo } from '@expo/vector-icons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Icon} from 'react-native-elements';
import {auth, db} from '../firebase';

function Menu({navigation}) {
    const user = firebase.auth().currentUser;

    function navigateToUserProfile() {
        navigation.navigate('UserProfile');
    }

    function logout() {
        auth.signOut().then(() => {
            navigation.replace('Login');
        })
    };

    function goToSettings() {
        navigation.navigate('Settings');
    };

    function navigateToChat() {
        navigation.navigate('Chat');
    };

    function navigateToEvents() {
        navigation.navigate('Events');
    }

    return (
        <ScrollView style={{backgroundColor: '#fff'}}>
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
                    {/*<Entypo name='shop' size={34} color='black' style={styles.headerLogo} />*/}
                    {/*<Image style={{height: 50, width: 50}} source={{uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.dreamstime.com%2Fb%2Fmarket-shop-line-icon-filled-outline-vector-sign-linear-colorful-pictogram-isolated-white-symbol-logo-illustration-95342994.jpg'}} />*/}
                    <Icon name='shop' reverse color='cadetblue'  />
                    <Text style={{textAlign: 'center', fontSize: 20, marginTop: 9}}>Marketplace</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.widgets}>
                    <Icon name='group' reverse color='purple' />
                    <Text style={{textAlign: 'center', fontSize: 20, marginTop: 9}} multiline={true}>Find Friends</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.widgets}>
                    <Icon name='bookmark' reverse color='violet' />
                    <Text style={{textAlign: 'center', fontSize: 20, marginTop: 9}}>Saved</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.widgets} onPress={goToSettings}>
                    <Icon name='settings' reverse color='green' />
                    <Text style={{textAlign: 'center', fontSize: 20, marginTop: 9}}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.widgets} onPress={navigateToEvents}>
                    <Icon name='event' reverse color='crimson' />
                    <Text style={{textAlign: 'center', fontSize: 20, marginTop: 9}}>Events</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.widgets} onPress={navigateToChat}>
                    <Icon name='chat' reverse color='gray' />
                    <Text style={{textAlign: 'center', fontSize: 20, marginTop: 9}}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={logout} style={{borderWidth: 0.4, borderColor: 'lightgray', marginTop: 20, backgroundColor: 'crimson',width: 328, borderRadius: 20, margin: 3, alignItems: 'center'}}>
                    <Icon name='logout' reverse color='' />
                    <Text style={{textAlign: 'center', fontSize: 20, marginTop: 9, color: 'white', marginBottom: 3}}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Menu;

const styles = StyleSheet.create({
    widgets: {
        borderWidth: 0.4,
        borderColor: 'lightgray',
        width: 160,
        borderRadius: 20,
        margin: 3,
        alignItems: 'center'
    }
})