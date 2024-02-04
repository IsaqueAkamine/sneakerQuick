import React, { useState } from "react";
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
  NikeLogo,
  WelcomeContainer,
  WelcomeText,
} from "./styles";
import { ActivityIndicator, Alert } from "react-native";

const SignUp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const logo = require("../../assets/img/nikelogo.png");
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
      .then(async (userCredential) => {
        const user = userCredential.user;

        await setDoc(doc(FIREBASE_DB, `users`, user.uid), {
          uid: user.uid,
          displayName: username,
          email: user.email,
        });
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Container>
      <WelcomeContainer>
        <NikeLogo source={logo} resizeMode="contain" />
        <WelcomeText>Bem vindo a Nike</WelcomeText>
        <LoginText>Crie sua conta para continuar</LoginText>
      </WelcomeContainer>

      <InputsContainer>
        <Input
          placeholder="Seu nome"
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
          placeholder="Senha"
          type="password"
          value={password}
          onChangeText={setPassword}
        />
        <Input
          placeholder="Confirme sua senha"
          type="password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </InputsContainer>

      <LoginButton onPress={handleCreateNewAccount}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <LoginButtonText>Criar conta</LoginButtonText>
        )}
      </LoginButton>

      <AccountContainer>
        <AccountText>Já tem uma conta? </AccountText>
        <AccountButtonText onPress={handleLoginNavigation}>
          Faça o login
        </AccountButtonText>
      </AccountContainer>
    </Container>
  );
};

export default SignUp;
