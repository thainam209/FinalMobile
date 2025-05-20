import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './Screen/MainScreen';
import ProductDetails from './Screen/ProductDetails';
import ShoppingCart from './Screen/ShoppingCart';
import Checkout from './Screen/Checkout';
import AddNewCard from './Screen/AddNewCard';
import Orders from './Screen/Orders';
import TrackOrder from './Screen/TrackOrder';
import SignUp from './Screen/SignUp';
import SignIn from './Screen/SignIn';
import StartedScreen from './Screen/StartedScreen';
import AccountInfo from './Screen/AccountInfo';
import AddressPayment from './Screen/AddressPayment';
import AddNewAddress from './Screen/AddNewAddress';
import EditPaymentMethod from './Screen/EditPaymentMethod'; // Import màn hình mới
import Products from './Screen/Products'; // Import
import { CartProvider } from './CartContext';
import { FavouritesProvider } from './FavouritesContext';
import Favourites from './Screen/Favourites';

const Stack = createStackNavigator();

export default function App() {
  return (
    <FavouritesProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="StartedScreen">
            <Stack.Screen name="StartedScreen" component={StartedScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
            <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Products" component={Products} options={{ headerShown: false }} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ headerShown: false }} />
            <Stack.Screen name="ShoppingCart" component={ShoppingCart} options={{ headerShown: false }} />
            <Stack.Screen name="Checkout" component={Checkout} options={{ headerShown: false }} />
            <Stack.Screen name="AddNewCard" component={AddNewCard} options={{ headerShown: false }} />
            <Stack.Screen name="Orders" component={Orders} options={{ headerShown: false }} />
            <Stack.Screen name="TrackOrder" component={TrackOrder} options={{ headerShown: false }} />
            <Stack.Screen name="AccountInfo" component={AccountInfo} options={{ headerShown: false }} />
            <Stack.Screen name="AddressPayment" component={AddressPayment} options={{ headerShown: false }} />
            <Stack.Screen name="AddNewAddress" component={AddNewAddress} options={{ headerShown: false }} />
            <Stack.Screen name="EditPaymentMethod" component={EditPaymentMethod} options={{ headerShown: false }} />
            <Stack.Screen name="Favourites" component={Favourites} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </FavouritesProvider>
  );
}