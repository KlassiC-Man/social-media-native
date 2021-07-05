import {Text, StyleSheet, View} from 'react-native';
import React from 'react';

function SearchUser({name, profilePic, id}) {
    return (
        <View>
            <Text>{name}</Text>
        </View>
    )
};

export default SearchUser;