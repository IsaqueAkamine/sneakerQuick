import React from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { setSelectedProduct } from "../../store/productsSlice";
import { RootState } from "../../store";

import { Container, Image, ImageButton } from "./styles";

const Product = ({ item }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleNavigateToDetails = () => {
    dispatch(setSelectedProduct(item.id));
    navigation.navigate("Details");
  };

  return (
    <ImageButton onPress={handleNavigateToDetails}>
      <Image source={{ uri: item.image }} />
    </ImageButton>
  );
};

const Products: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);

  return (
    <Container>
      <FlatList
        data={products}
        renderItem={({ item, index }) => <Product item={item} />}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </Container>
  );
};

export default Products;
