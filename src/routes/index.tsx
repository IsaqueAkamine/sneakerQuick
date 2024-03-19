import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AppStack from "./AppStack";
import AuthStack from "./AuthStack";

import { init as initAuth } from "../store/AuthSlice";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageKey from "../enums/StorageKeys";
import { RootState } from "../store";

export default function Routes() {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const init = async () => {
    const user = await AsyncStorage.getItem(StorageKey.USER_KEY);
    if (user !== null) {
      dispatch(initAuth(user));
    }
    setLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#9098b1" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
