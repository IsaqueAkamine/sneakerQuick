import React from "react";

import { Container } from "./styles";
import { Text } from "react-native";

type TSneakerSizeProps = {
  size: string;
};

const SneakerSize: React.FC<TSneakerSizeProps> = ({ size }) => {
  return (
    <Container>
      <Text>{size}</Text>
    </Container>
  );
};

export default SneakerSize;
