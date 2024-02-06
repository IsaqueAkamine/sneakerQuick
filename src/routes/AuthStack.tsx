import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";
// import { GOOGLE_WEB_CLIENT_ID, GOOGLE_IOS_CLIENT_ID } from "@env";

import { Login, SignUp } from "../screens";

const Stack = createNativeStackNavigator();

// GoogleSignin.configure({
//   offlineAccess: false,
//   webClientId:
//     "114105904431-vpn1ikjrs8rahc87h23hgsoi3rd5rbls.apps.googleusercontent.com",
//   scopes: ["profile", "email"],
// });

// GoogleSignin.configure({
//   scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
//   webClientId: GOOGLE_WEB_CLIENT_ID, // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
//   offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//   hostedDomain: "", // specifies a hosted domain restriction
//   forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
//   accountName: "", // [Android] specifies an account name on the device that should be used
//   iosClientId: GOOGLE_IOS_CLIENT_ID, // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
//   googleServicePlistPath: "", // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
//   openIdRealm: "", // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
//   profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
// });

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
