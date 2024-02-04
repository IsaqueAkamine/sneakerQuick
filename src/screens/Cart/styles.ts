import styled from "styled-components/native";
import { isIphoneX, getStatusBarHeight } from "react-native-iphone-x-helper";

const paddingTop = isIphoneX() ? getStatusBarHeight() : 0;

export const Container = styled.View`
  flex: 1;
  padding: ${paddingTop + 10}px 0 30% 0;
`;

export const TotalsContainer = styled.View`
  margin: 20px;
  padding: 10px 0 0 0;
  border-color: gainsboro;
  border-top-width: 1px;
`;

export const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 2px 0;
`;

export const TextInfo = styled.Text`
  font-size: 16px;
  color: gray;
`;

export const TextInfoBold = styled.Text`
  font-size: 16px;
  font-weight: 500;
`;

export const FooterContainer = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: white;
  border-color: gainsboro;
  border-top-width: 1px;
  padding: 20px;
`;

export const CheckoutButton = styled.Pressable`
  width: 100%;
  background-color: black;
  align-self: center;
  align-items: center;
  padding: 20px;
  border-radius: 100px;
`;

export const CheckoutText = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 16px;
`;
