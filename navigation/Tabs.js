import React from 'react';
// bottom-tab-navigator
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../screen/Login';
import Home from '../screen/Home';
import Post from '../screen/Post';
// design import
import { useColorScheme } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const isDark = useColorScheme() === 'dark';
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelPosition: 'below-icon',
        tabBarActiveTintColor: isDark ? 'white' : 'black',
        headerTintColor: isDark ? 'white' : 'black',
        tabBarLabel: 'Home',
      }}
    >
      <Tab.Screen
        options={{
          title: 'Login',
          headerTitleAlign: 'center',
          tabBarLabel: 'Login',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
        name="Login"
        component={Login}
      />
      <Tab.Screen
        options={{
          title: 'MY word',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          title: 'Post',
          tabBarLabel: 'Post',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="form" size={size} color={color} />
          ),
        }}
        name="Post"
        component={Post}
      />
    </Tab.Navigator>
  );
}
