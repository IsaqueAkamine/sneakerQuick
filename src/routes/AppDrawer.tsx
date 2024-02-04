import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { Products } from "../screens";
import { Image, Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCartIcon } from "react-native-heroicons/outline";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  UserIcon,
  ArrowRightStartOnRectangleIcon,
} from "react-native-heroicons/outline";

import { selectNumberOfItems } from "../store/cartSlice";
import { AuthSlice } from "../store/AuthSlice";
import StorageKey from "../enums/StorageKeys";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const handleLogout = async () => {
    dispatch(AuthSlice.actions.logout());
    await AsyncStorage.removeItem(StorageKey.USER_KEY);
  };

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          marginBottom: 10,
        }}>
        {user?.picture ? (
          <Image
            source={{ uri: user?.picture }}
            style={{ width: 40, height: 40, borderRadius: 25 }}
          />
        ) : (
          <View
            style={{
              borderRadius: 30,
              padding: 8,
              borderColor: "gray",
              borderWidth: 2,
            }}>
            <UserIcon size={24} color="gray" />
          </View>
        )}
        <View style={{ gap: 4 }}>
          {user?.given_name ? (
            <Text style={{ color: "#000", fontWeight: "600" }}>
              {user?.given_name}
            </Text>
          ) : (
            <Text style={{ color: "#000", fontWeight: "600" }}>Hi</Text>
          )}
          <Text style={{ color: "gray" }}>{user?.email}</Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#ebf0ff",
          height: 1,
        }}
      />

      <DrawerItemList {...props} />

      <DrawerItem
        label="Logout"
        icon={() => <ArrowRightStartOnRectangleIcon size={22} color="gray" />}
        onPress={handleLogout}
      />
    </DrawerContentScrollView>
  );
}

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
    <Drawer.Navigator
      initialRouteName="Products"
      drawerContent={CustomDrawerContent}>
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
