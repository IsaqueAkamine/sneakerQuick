import styled from "styled-components/native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

export const ImageContainer = styled.View``;

export const Image = styled.Image`
  width: ${width}px;
  aspect-ratio: 1;
`;

export const InfoContainer = styled.View`
  padding: 20px 20px 30% 20px;
`;

export const Title = styled.Text`
  font-size: 34px;
  font-weight: 500;
  margin: 10px 0;
`;

export const Price = styled.Text`
  font-weight: 500;
  font-size: 16px;
`;

export const Description = styled.Text`
  font-size: 18px;
  font-weight: 300;
  margin: 10px 0;
  line-height: 30px;
`;

export const AddCartButton = styled.Pressable`
  background-color: black;
  position: absolute;
  bottom: 30px;
  width: 90%;
  align-self: center;
  align-items: center;
  padding: 20px;
  border-radius: 100px;
`;

export const AddCartText = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 16px;
`;
