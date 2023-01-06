import React from 'react';
import Stacks from './Stacks';
import Tabs from './Tabs';
// react-navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function Root() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={Tabs}></Stack.Screen>
      <Stack.Screen name="Stacks" component={Stacks}></Stack.Screen>
    </Stack.Navigator>
  );
}
