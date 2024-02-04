import React from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Container, Image, ImageButton } from './styles';
import products from '../../data/products';

const Product = ({ item }) => {
  const navigation = useNavigation();

  const handleNavigateToDetails = () => {
    navigation.navigate('Details', { selectedProduct: item });
  };

  return (
    <ImageButton onPress={handleNavigateToDetails}>
      <Image source={{ uri: item.image }} />
    </ImageButton>
  );
};

const Products: React.FC = () => {
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
