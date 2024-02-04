import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppDrawer from './AppDrawer';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Drawer" component={AppDrawer} />
    </Stack.Navigator>
  );
}
