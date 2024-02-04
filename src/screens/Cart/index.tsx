import React from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";

import {
  selectDeliveryPrice,
  selectSubtotal,
  selectTotal,
} from "../../store/cartSlice";

import CartListItem from "../../components/CartListItem";

import {
  CheckoutButton,
  CheckoutText,
  Container,
  FooterContainer,
  RowContainer,
  TextInfo,
  TextInfoBold,
  TotalsContainer,
} from "./styles";

const Cart: React.FC = () => {
  const cartItems = useSelector(state => state.cart.items);
  const subTotal = useSelector(selectSubtotal);
  const deliveryFee = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);

  return (
    <Container>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => (
          <TotalsContainer>
            <RowContainer>
              <TextInfo>Subtotal</TextInfo>
              <TextInfo>{subTotal} US$</TextInfo>
            </RowContainer>
            <RowContainer>
              <TextInfo>Delivery</TextInfo>
              <TextInfo>{deliveryFee} US$</TextInfo>
            </RowContainer>
            <RowContainer>
              <TextInfoBold>Total</TextInfoBold>
              <TextInfoBold>{total} US$</TextInfoBold>
            </RowContainer>
          </TotalsContainer>
        )}
      />
      <FooterContainer>
        <CheckoutButton>
          <CheckoutText>Checkout</CheckoutText>
        </CheckoutButton>
      </FooterContainer>
    </Container>
  );
};

export default Cart;
