import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  border-radius: 5px;
  border-color: #ebf0ff;
  border-width: 1px;
  padding: 16px;
  gap: 10px;
`;

export const Logo = styled.Image`
  width: 24px;
  aspect-ratio: 1;
`;

export const Description = styled.Text`
  flex: 1;
  color: #9098b1;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  line-height: 25px;
  letter-spacing: 0.5px;
`;
