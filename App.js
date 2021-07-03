import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import PostScreen from './screens/PostScreen';
import UserProfile from './screens/UserProfile';
import Search from './screens/Search';
import Marketplace from './screens/Marketplace';
import AddItem from './screens/AddItem';
import SellItemScreen from './screens/SellItemScreen';
import Chat from './screens/Chat';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name='SignUp' component={SignUp} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Post' component={PostScreen} />
        <Stack.Screen name='UserProfile' component={UserProfile} />
        <Stack.Screen name='Search' component={Search} />
        <Stack.Screen name='Marketplace' component={Marketplace} />
        <Stack.Screen name='AddItem' component={AddItem} />
        <Stack.Screen name='SellItemScreen' component={SellItemScreen} />
        <Stack.Screen name='Chat' component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
