import styled from "styled-components/native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 16px;
`;

export const WelcomeContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const NikeLogo = styled.Image`
  height: ${width * 0.4}px;
  aspect-ratio: 1;
`;

export const WelcomeText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.5px;
  line-height: 24px;
`;

export const LoginText = styled.Text`
  color: #9098b1;
  font-size: 12px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0.5px;
`;

export const InputsContainer = styled.View`
  margin-top: 20px;
  gap: 8px;
`;

export const LoginButton = styled.TouchableOpacity`
  background-color: #40bfff;
  padding: 16px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
`;

export const LoginButtonText = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  line-height: 25px;
  letter-spacing: 0.5px;
`;

export const AccountContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 14px;
`;
export const AccountText = styled.Text`
  color: #9098b1;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: 0.5px;
`;

export const AccountButtonText = styled.Text`
  color: #40bfff;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: 0.5px;
`;
