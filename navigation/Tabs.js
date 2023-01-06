import React from 'react';
// bottom-tab-navigator
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../screen/Login';
import Home from '../screen/Home';
import Post from '../screen/Post';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelPosition: 'beside-icon',
        tabBarLabel: 'Home',
      }}
    >
      <Tab.Screen
        options={{
          title: 'Login',
          headerTitleAlign: 'center',
          tabBarLabel: 'Login',
        }}
        name="Login"
        component={Login}
      />
      <Tab.Screen
        options={{
          title: 'MY word',
          tabBarLabel: 'Home',
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          title: 'Post',
          tabBarLabel: 'Post',
        }}
        name="Post"
        component={Post}
      />
    </Tab.Navigator>
  );
}
