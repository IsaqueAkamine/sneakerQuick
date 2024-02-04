import React from "react";

import { Container, Description, Logo } from "./styles";
import { TouchableOpacityProps } from "react-native";

type TSocialLoginButtonProps = TouchableOpacityProps & {
  name: "Google" | "Facebook";
};

const SocialLoginButton: React.FC<TSocialLoginButtonProps> = ({
  name,
  ...rest
}) => {
  const isGoogle = name === "Google";
  const LogoGoogle = require("../../assets/img/Google.png");
  const LogoFacebook = require("../../assets/img/Facebook.png");
  return (
    <Container {...rest}>
      <Logo source={isGoogle ? LogoGoogle : LogoFacebook} />
      <Description>Login com {name}</Description>
    </Container>
  );
};

export default SocialLoginButton;
