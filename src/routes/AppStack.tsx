import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppDrawer from "./AppDrawer";
import { Cart, Details } from "../screens";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Drawer" component={AppDrawer} />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  );
}
