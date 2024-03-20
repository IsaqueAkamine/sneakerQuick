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

export const FilterContainer = styled.View`
  margin: 20px 20px 0 20px;
  border-width: 1px;
  border-color: #ddd;
  border-radius: 24px;
  flex-direction: row;
  align-items: center;
  padding: 6px 20px 6px 12px;
  gap: 4px;
`;

export const FilterInput = styled.TextInput`
  flex: 1;
  height: 36px;
`;
