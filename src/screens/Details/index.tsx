import React from "react";
import { useNavigation } from "@react-navigation/native";

import { addCartItem } from "../../store/cartSlice";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { capitalizeFirstLetter } from "../../utils";

import {
  AddCartButton,
  AddCartText,
  Container,
  Description,
  Image,
  ImageContainer,
  InfoContainer,
  Price,
  ScrollContainer,
  Title,
} from "./styles";

const Product = ({ uri }) => (
  <ImageContainer>
    <Image source={{ uri }} resizeMode="contain" />
  </ImageContainer>
);

const Details: React.FC = () => {
  const product = useSelector(
    (state: RootState) => state.products.selectedProduct,
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleAddToCart = () => {
    dispatch(addCartItem({ product }));
    navigation.goBack();
  };

  return (
    <Container>
      <ScrollContainer showsVerticalScrollIndicator={false}>
        <Product uri={product.image} />
        <InfoContainer>
          {/* Title */}
          <Title>{capitalizeFirstLetter(product.title)}</Title>

          {/* Price */}
          <Price>$ {product.base_price}</Price>

          {/* Description */}
          <Description>{product.description}</Description>
        </InfoContainer>
      </ScrollContainer>

      {/* Add to cart button */}
      <AddCartButton onPress={handleAddToCart}>
        <AddCartText>Add to cart</AddCartText>
      </AddCartButton>
    </Container>
  );
};

export default Details;
