import React from 'react';
// bottom-tab-navigator
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screen/Home';
import Post from '../screen/Post';
import My from '../screen/My';
// design import
import { useColorScheme } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Tabs({ navigation: { reset } }) {
  const isDark = useColorScheme() === 'dark';
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        tabBarLabelPosition: 'below-icon',
        tabBarActiveTintColor: isDark ? 'white' : 'black',
        headerTintColor: isDark ? 'white' : 'black',
        tabBarLabel: 'Home',
        presentation: 'modal',
      }}
    >
      <Tab.Screen
        options={{
          title: 'MY',
          headerTitleAlign: 'center',
          tabBarLabel: 'MY',

          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
        name="My"
        component={My}
      />

      <Tab.Screen
        options={{
          title: 'MZ Language',
          tabBarLabel: 'Home',
          unmountOnBlur: true,
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
