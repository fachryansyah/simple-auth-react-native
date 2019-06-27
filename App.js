/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import LoginScreen from "./screens/LoginScreen"
import HomeScreen from "./screens/HomeScreen"

const MainNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen
  },
  Home: {
    screen: HomeScreen
  }
},
{
  defaultNavigationOptions: {
    header: null
  },
});

const App = createAppContainer(MainNavigator);

export default App;

