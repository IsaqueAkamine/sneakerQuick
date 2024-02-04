import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as Google from "expo-auth-session/providers/google";

import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../services/firebaseConfig";

import { AuthSlice } from "../../store/AuthSlice";
import StorageKey from "../../enums/StorageKeys";

import Input from "../../components/Input";
import SocialLoginButton from "../../components/SocialLoginButton";

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
  NikeLogo,
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

  const logo = require("../../assets/img/nikelogo.png");
  const navigation = useNavigation();

  const handleNavigateSignUp = () => {
    navigation.navigate("SignUp");
  };

  const handleLogin = () => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
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

  const handleSignInWithGoogle = async () => {
    // if (response?.type === "success") {
    //   const token = response.authentication.accessToken;
    //   if (!token) return;
    //   try {
    //     const response = await fetch(
    //       "https://www.googleapis.com/userinfo/v2/me",
    //       {
    //         headers: { Authorization: `Bearer ${token}` },
    //       },
    //     );
    //     const user = await response.json();
    //     const newUser = {
    //       accessToken: user.accessToken,
    //       email: user.email,
    //       picture: user.picture,
    //       given_name: user.given_name,
    //     };
    //     AsyncStorage.setItem(StorageKey.USER_KEY, JSON.stringify(newUser));
    //     dispatch(AuthSlice.actions.loginUser(newUser));
    //   } catch (error) {
    //     // add handle error
    //   }
    // } else if (response?.type === "cancel") {
    //   Alert.alert("Error", "This function don't work with Expo");
    // }
  };

  function handleForgotPassword() {
    setIsLoading(true);
    let error = "";

    if (email.trim().length < 3) error = "Email inválido";

    if (error.length > 0) {
      setIsLoading(false);
      return Alert.alert("Error", error);
    }

    sendPasswordResetEmail(auth, email)
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
        <NikeLogo source={logo} resizeMode="contain" />
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
        <SocialLoginButton name="Google" />
        <SocialLoginButton name="Facebook" />
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
