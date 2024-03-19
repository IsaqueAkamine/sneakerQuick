import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  fetchProducts,
  fetchProductsByBrand,
  setSelectedProduct,
} from "../../store/ProductsSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";

import {
  Container,
  FilterContainer,
  FilterInput,
  Image,
  ImageButton,
} from "./styles";

const Product = ({ item }) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleNavigateToDetails = () => {
    dispatch(setSelectedProduct(item));
    navigation.navigate("Details");
  };

  return (
    <ImageButton onPress={handleNavigateToDetails}>
      {item.image && (
        <Image source={{ uri: item.image }} resizeMode="contain" />
      )}
    </ImageButton>
  );
};

const FilterByBrand = () => {
  const dispatch = useAppDispatch();

  let filterText = "";
  return (
    <FilterContainer>
      <MagnifyingGlassIcon />
      <FilterInput
        placeholder="Search by brand"
        onChangeText={text => {
          filterText = text;
        }}
        onSubmitEditing={() => {
          dispatch(fetchProductsByBrand(filterText));
        }}
      />
    </FilterContainer>
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
        ListHeaderComponent={<FilterByBrand />}
      />
    </Container>
  );
};

export default Products;
