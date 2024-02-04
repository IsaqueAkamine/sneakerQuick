import { createDrawerNavigator } from "@react-navigation/drawer";
import { Products } from "../screens";
import { Pressable, Text } from "react-native";
import { useSelector } from "react-redux";
import { selectNumberOfItems } from "../store/cartSlice";

import { ShoppingCartIcon } from "react-native-heroicons/outline";

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  const numberOfItems = useSelector(selectNumberOfItems);

  const rightIcon = navigation => (
    <Pressable
      onPress={() => navigation.navigate("Cart")}
      style={{
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        right: 10,
      }}>
      <ShoppingCartIcon size={24} color="gray" />
      <Text style={{ marginLeft: 5, fontWeight: "500" }}>{numberOfItems}</Text>
    </Pressable>
  );

  return (
    <Drawer.Navigator initialRouteName="Products">
      <Drawer.Screen
        name="Products"
        component={Products}
        options={({ navigation }) => ({
          headerRight: () => rightIcon(navigation),
          drawerIcon: ({ size, color }) => (
            <ShoppingCartIcon size={size} color={color} />
          ),
        })}
      />
    </Drawer.Navigator>
  );
}
