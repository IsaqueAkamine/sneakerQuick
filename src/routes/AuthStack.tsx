import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../screens";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      {/* <Stack.Screen name="SignUp" component={SignUp} /> */}
    </Stack.Navigator>
  );
}
