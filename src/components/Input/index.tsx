import React from "react";
import { TextInputProps } from "react-native";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from "react-native-heroicons/outline";

import { Container, InputStyled } from "./styles";

type TInputProps = TextInputProps & {
  type: "email" | "password" | "user";
};

const Input: React.FC<TInputProps> = ({ type, ...rest }) => {
  const isPassword = type === "password";

  const Icon = () => {
    switch (type) {
      case "email":
        return <EnvelopeIcon size={18} color="#9098B1" />;
      case "password":
        return <LockClosedIcon size={18} color="#9098B1" />;
      default:
        return <UserIcon size={18} color="#9098B1" />;
    }
  };

  return (
    <Container>
      <Icon />
      <InputStyled {...rest} secureTextEntry={isPassword} />
    </Container>
  );
};

export default Input;
