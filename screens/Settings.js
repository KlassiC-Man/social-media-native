import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { View, Text, Switch } from 'react-native';
import {db, auth} from '../firebase';

function Settings() {
    const [darkMode, setDarkMode] = useState(false);

    function darkModeOnOrOff() {
        setDarkMode(previousState => !previousState);
        // Still have to actually implement the dark mode and everything!!
    };

    return (
        <ScrollView>
            <View style={{borderWidth: 0.5, height: 60, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 20, margin: 5, marginTop: 15 }}>Dark Mode</Text>
                <Switch style={{width: 20}} trackColor={{false: 'lightgray', true: 'cadetblue'}} thumbColor={darkMode ? '#f5dd4b' : '#f4f3f4'} onValueChange={darkModeOnOrOff} value={darkMode} />
            </View>
        </ScrollView>
    )
}

export default Settings;