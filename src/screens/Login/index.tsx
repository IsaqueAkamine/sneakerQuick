import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth as authFirebase } from "../../services/firebaseConfig";

import { AuthSlice } from "../../store/AuthSlice";
import StorageKey from "../../enums/StorageKeys";

import Input from "../../components/Input";
import SocialLoginButton from "../../components/SocialLoginButton";

import { GOOGLE_WEB_CLIENT_ID } from "@env";

import {
  Container,
  Divider,
  ForgotText,
  InputsContainer,
  LoginButton,
  LoginButtonText,
  LoginText,
  NewAccountButtonText,
  NewAccountContainer,
  NewAccountText,
  QuickLogo,
  SeparatorContainer,
  SeparatorText,
  SocialButtonsContainer,
  WelcomeContainer,
  WelcomeText,
} from "./styles";

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  // });

  const dispatch = useDispatch();

  const logo = require("../../assets/img/QuickLogo.png");
  const navigation = useNavigation();

  const handleNavigateSignUp = () => {
    navigation.navigate("SignUp");
  };

  const handleLogin = () => {
    setIsLoading(true);
    signInWithEmailAndPassword(authFirebase, email, password)
      .then(userCredential => {
        // // Signed in
        const credential = userCredential.user;
        const user = {
          accessToken: credential.accessToken,
          email: credential.email,
        };
        // // ...
        AsyncStorage.setItem(StorageKey.USER_KEY, JSON.stringify(user));
        dispatch(AuthSlice.actions.loginUser(user));
      })
      .catch(error => {
        Alert.alert("Error", error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  async function onGoogleButtonPress() {
    try {
      GoogleSignin.configure({
        offlineAccess: false,
        webClientId: GOOGLE_WEB_CLIENT_ID,
        scopes: ["profile", "email"],
      });

      console.log("GOOGLE BUTTON PRESS ");
      // Check if your device supports Google Play
      const teste = await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      })
        .then(data => console.log("hasPlayServices THEN ", data))
        .catch(error => console.log("hasPlayServices ERROR ", error))
        .finally(() => console.log("hasPlayServices FINALLY "));
      console.log("HAS PLAY SERVICES ", teste);
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn()
        // const loggedUser = await GoogleSignin.signIn()
        .then(() => console.log("SIGN IN THEN "))
        .catch(error => console.log("SIGN IN ERROR ", error))
        .finally(() => console.log("SIGN IN FINALLY "));

      console.log("SIGN IN 3333 ", idToken);
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // // Sign-in the user with the credential
      return auth()
        .signInWithCredential(googleCredential)
        .then(() => console.log("THEN "))
        .catch(error => console.log("ERROR ", error))
        .finally(() => console.log("FINALLY "));
    } catch (error) {
      console.log("ERROR CONFIGURE ", error);
    }
  }

  const handleSignInWithGoogle = async () => {
    // try {
    //   await GoogleSignin.hasPlayServices();
    //   const userInfo = await GoogleSignin.signIn();
    //   // setState({ userInfo });
    //   console.log("USER INFO: ", { userInfo });
    // } catch (error) {
    //   console.log("SIGN_IN_ERROR: ", error);
    //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //     // user cancelled the login flow
    //   } else if (error.code === statusCodes.IN_PROGRESS) {
    //     // operation (e.g. sign in) is in progress already
    //   } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //     // play services not available or outdated
    //   } else {
    //     // some other error happened
    //   }
    // }
    // try {
    //   await GoogleSignin.hasPlayServices();
    //   const userInfo = await GoogleSignin.signIn();
    //   // setState({ userInfo, error: undefined });
    //   console.log("USER INFO: ", { userInfo, error: undefined });
    // } catch (error) {
    //   // console.log("USER ERROR: ", error.message);
    //   if (error) {
    //     switch (error.code) {
    //       case statusCodes.SIGN_IN_CANCELLED:
    //         // user cancelled the login flow
    //         console.log("SIGN_IN_CANCELLED: ", error);
    //         break;
    //       case statusCodes.IN_PROGRESS:
    //         // operation (eg. sign in) already in progress
    //         console.log("IN_PROGRESS: ", error);
    //         break;
    //       case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
    //         // play services not available or outdated
    //         console.log("PLAY_SERVICES_NOT_AVAILABLE: ", error);
    //         break;
    //       default:
    //         console.log("DEFAULT ERROR: ", error);
    //       // some other error happened
    //     }
    //   } else {
    //     // an error that's not related to google sign in occurred
    //   }
    // }
  };

  // const handleSignInWithGoogle = async () => {
  //   // if (response?.type === "success") {
  //   //   const token = response.authentication.accessToken;
  //   //   if (!token) return;
  //   //   try {
  //   //     const response = await fetch(
  //   //       "https://www.googleapis.com/userinfo/v2/me",
  //   //       {
  //   //         headers: { Authorization: `Bearer ${token}` },
  //   //       },
  //   //     );
  //   //     const user = await response.json();
  //   //     const newUser = {
  //   //       accessToken: user.accessToken,
  //   //       email: user.email,
  //   //       picture: user.picture,
  //   //       given_name: user.given_name,
  //   //     };
  //   //     AsyncStorage.setItem(StorageKey.USER_KEY, JSON.stringify(newUser));
  //   //     dispatch(AuthSlice.actions.loginUser(newUser));
  //   //   } catch (error) {
  //   //     // add handle error
  //   //   }
  //   // } else if (response?.type === "cancel") {
  //   //   Alert.alert("Error", "This function don't work with Expo");
  //   // }
  // };

  function handleForgotPassword() {
    setIsLoading(true);
    let error = "";

    if (email.trim().length < 3) error = "Email inválido";

    if (error.length > 0) {
      setIsLoading(false);
      return Alert.alert("Error", error);
    }

    sendPasswordResetEmail(authFirebase, email)
      .then(() => Alert.alert("Esqueceu a senha", "Um email foi enviado"))
      .catch(error => {
        Alert.alert("Error", error.message);
      })
      .finally(() => setIsLoading(false));
  }

  // useEffect(() => {
  //   handleSignInWithGoogle();
  // }, [response]);

  return (
    <Container>
      <WelcomeContainer>
        <QuickLogo source={logo} resizeMode="contain" />
        <WelcomeText>Welcome to Sneaker Quick</WelcomeText>
        <LoginText>Please login to continue</LoginText>
      </WelcomeContainer>

      <InputsContainer>
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder="Senha"
          type="password"
          value={password}
          onChangeText={setPassword}
        />
      </InputsContainer>

      <LoginButton onPress={handleLogin}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <LoginButtonText>Login</LoginButtonText>
        )}
      </LoginButton>

      <SeparatorContainer>
        <Divider />
        <SeparatorText>Or</SeparatorText>
        <Divider />
      </SeparatorContainer>

      <SocialButtonsContainer>
        {/* <SocialLoginButton name="Google" onPress={() => promptAsync()} /> */}
        <SocialLoginButton name="Google" onPress={handleSignInWithGoogle} />
        {/* <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={handleSignInWithGoogle}
          // onPress={() => {
          //   // initiate sign in
          // }}
          // disabled={isInProgress}
        /> */}

        <SocialLoginButton name="Facebook" onPress={onGoogleButtonPress} />
      </SocialButtonsContainer>

      <ForgotText onPress={handleForgotPassword}>
        Forgot your password?
      </ForgotText>

      <NewAccountContainer>
        <NewAccountText>Don't have account? </NewAccountText>
        <NewAccountButtonText onPress={handleNavigateSignUp}>
          Sign up
        </NewAccountButtonText>
      </NewAccountContainer>
    </Container>
  );
};

export default Login;
