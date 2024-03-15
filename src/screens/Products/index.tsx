import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { fetchProducts, setSelectedProduct } from "../../store/productsSlice";
import { useAppDispatch, useAppSelector } from "../../store";

import { Container, Image, ImageButton } from "./styles";

const Product = ({ item }) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleNavigateToDetails = () => {
    dispatch(setSelectedProduct(item));
    navigation.navigate("Details");
  };

  return (
    <ImageButton onPress={handleNavigateToDetails}>
      <Image source={{ uri: item.image }} resizeMode="contain" />
    </ImageButton>
  );
};

const Products: React.FC = () => {
  const { productsSneaker } = useAppSelector(state => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <Container>
      <FlatList
        data={productsSneaker}
        renderItem={({ item, index }) => <Product item={item} />}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </Container>
  );
};

export default Products;
