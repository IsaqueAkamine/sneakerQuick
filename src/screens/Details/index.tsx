import React from "react";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";

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
import { cartSlice } from "../../store/cartSlice";
import { useNavigation } from "@react-navigation/native";

const Product = ({ uri }) => (
  <ImageContainer>
    <Image source={{ uri }} />
  </ImageContainer>
);

const Details: React.FC = () => {
  const product = useSelector(state => state.products.selectedProduct);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleAddToCart = () => {
    dispatch(cartSlice.actions.addCartItem({ product }));
    navigation.goBack();
  };

  return (
    <Container>
      <ScrollContainer showsVerticalScrollIndicator={false}>
        {/* Image Carousel */}
        <FlatList
          data={product.images}
          renderItem={({ item }) => <Product uri={item} />}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
        />

        <InfoContainer>
          {/* Title */}
          <Title>{product.name}</Title>

          {/* Price */}
          <Price>$ {product.price}</Price>

          {/* Description */}
          <Description>{product.description}</Description>
        </InfoContainer>
      </ScrollContainer>

      {/* Add to cart button */}
      <AddCartButton onPress={handleAddToCart}>
        <AddCartText>Add to cart</AddCartText>
      </AddCartButton>

      {/* Navigation icon */}
    </Container>
  );
};

export default Details;
