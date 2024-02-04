import styled from "styled-components/native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const ImageButton = styled.Pressable`
  margin: 2px;
`;

export const Image = styled.Image`
  width: ${width / 2}px;
  aspect-ratio: 1;
`;
