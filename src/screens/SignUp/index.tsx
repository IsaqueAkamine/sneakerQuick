import React, { useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FIREBASE_DB, auth } from "../../services/firebaseConfig";

import Input from "../../components/Input";

import {
  AccountButtonText,
  AccountContainer,
  AccountText,
  Container,
  InputsContainer,
  LoginButton,
  LoginButtonText,
  LoginText,
  QuickLogo,
  WelcomeContainer,
  WelcomeText,
} from "./styles";

const SignUp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const logo = require("../../assets/img/QuickLogo.png");
  const navigation = useNavigation();

  const handleLoginNavigation = () => {
    navigation.goBack();
  };

  const handleCreateNewAccount = async () => {
    setIsLoading(true);
    let error = "";

    if (username.trim().length < 3) error = "Nome inválido";
    else if (email.trim().length < 3) error = "Email inválido";
    else if (password.trim().length < 3) error = "Senha inválida";
    else if (password !== confirmPassword) error = "Senha inválida";

    if (error.length > 0) {
      setIsLoading(false);
      return Alert.alert("Error", error);
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(async userCredential => {
        const user = userCredential.user;

        await setDoc(doc(FIREBASE_DB, `users`, user.uid), {
          uid: user.uid,
          displayName: username,
          email: user.email,
        });

        Alert.alert("Success", "Your account has been successfully created.");
        handleLoginNavigation();
      })
      .catch(error => {
        Alert.alert("Error", error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Container>
      <WelcomeContainer>
        <QuickLogo source={logo} resizeMode="contain" />
        <WelcomeText>Welcome to Sneaker Quick</WelcomeText>
        <LoginText>Create your account to continue</LoginText>
      </WelcomeContainer>

      <InputsContainer>
        <Input
          placeholder="Your name"
          type="user"
          value={username}
          onChangeText={setUsername}
          autoCorrect={false}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCorrect={false}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChangeText={setPassword}
        />
        <Input
          placeholder="Confirm your password"
          type="password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </InputsContainer>

      <LoginButton onPress={handleCreateNewAccount}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <LoginButtonText>Create account</LoginButtonText>
        )}
      </LoginButton>

      <AccountContainer>
        <AccountText>Already have an account? </AccountText>
        <AccountButtonText onPress={handleLoginNavigation}>
          Login
        </AccountButtonText>
      </AccountContainer>
    </Container>
  );
};

export default SignUp;
