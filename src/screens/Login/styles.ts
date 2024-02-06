import styled from "styled-components/native";
import { Dimensions, Platform } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

const { width, height } = Dimensions.get("window");

const paddingTop = Platform.OS === "android" ? 16 : getStatusBarHeight() + 16;

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: ${paddingTop}px 16px 16px 16px;
`;

export const WelcomeContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin: 16px 0;
`;

export const QuickLogo = styled.Image`
  height: ${width * 0.4}px;
  aspect-ratio: 1;
`;

export const WelcomeText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.5px;
  line-height: 24px;
  margin: 8px 0 0 0;
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

export const SeparatorContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 18px;
  margin-top: 20px;
`;

export const Divider = styled.View`
  height: 1px;
  flex: 1;
  background-color: #ebf0ff;
`;

export const SeparatorText = styled.Text`
  color: #9098b1;
  font-size: 14px;
  font-weight: 700;
  line-height: 21px;
  letter-spacing: 0.07px;
`;

export const SocialButtonsContainer = styled.View`
  margin-top: 18px;
  gap: 8px;
`;

export const ForgotText = styled.Text`
  text-align: center;
  margin-top: 16px;
  color: #40bfff;
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0.5px;
`;

export const NewAccountContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 14px;
`;
export const NewAccountText = styled.Text`
  color: #9098b1;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: 0.5px;
`;

export const NewAccountButtonText = styled.Text`
  color: #40bfff;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: 0.5px;
`;
