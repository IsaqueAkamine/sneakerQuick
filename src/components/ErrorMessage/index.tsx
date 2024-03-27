import React from "react";

import { Container, Description, Title } from "./styles";

type ErrorMessageProps = {
  error: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <Container>
      <Title>Something went wrong!</Title>
      <Description>{error}</Description>
    </Container>
  );
};

export default ErrorMessage;
