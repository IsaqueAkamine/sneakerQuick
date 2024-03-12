import React, { useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../services/firebaseConfig";

import { loginUser } from "../../store/authSlice";
import StorageKey from "../../enums/StorageKeys";

import Input from "../../components/Input";

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
  WelcomeContainer,
  WelcomeText,
} from "./styles";

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const logo = require("../../assets/img/QuickLogo.png");
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
        dispatch(loginUser(user));
      })
      .catch(error => {
        Alert.alert("Error", error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
