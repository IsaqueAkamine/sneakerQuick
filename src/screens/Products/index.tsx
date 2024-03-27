import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  fetchProducts,
  fetchProductsByBrand,
  setSelectedProduct,
} from "../../store/productsSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";

import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

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
      <MagnifyingGlassIcon size={26} color="#007bff" />
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
  const { productsSneaker, status, error } = useAppSelector(
    state => state.products,
  );
  const dispatch = useAppDispatch();

  function Content() {
    if (status === "loading") {
      return <Loading />;
    } else if (status === "succeeded") {
      return (
        <FlatList
          data={productsSneaker}
          renderItem={({ item, index }) => <Product item={item} />}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
          ListHeaderComponent={<FilterByBrand />}
        />
      );
    } else if (error === "failed") {
      return <ErrorMessage error={error} />;
    }
  }

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [status, dispatch]);

  return (
    <Container>
      <Content />
    </Container>
  );
};

export default Products;
