import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FavouritesContext } from '../FavouritesContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Favourites({ navigation }) {
  const { favourites, toggleFavourite, refreshFavourites } = useContext(FavouritesContext);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // console.log('Favourites screen - Current favourites:', favourites);
  }, [favourites]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await refreshFavourites();
    } catch (error) {
      console.error('Error refreshing favourites:', error);
    } finally {
      setRefreshing(false);
    }
  }, [refreshFavourites]);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
    >
      <Image
        source={
          item.image 
            ? { uri: item.image } 
            : item.images && item.images[0] && item.images[0].src 
              ? { uri: item.images[0].src }
              : require('../assets/icon_image.png')
        }
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price} Vnđ</Text>
      </View>
      <TouchableOpacity 
        style={styles.favouriteButton}
        onPress={() => toggleFavourite(item)}
      >
        <Icon name="favorite" size={24} color="#FF6B6B" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerBlue}>
        <View style={styles.headerRow}>
          <Text style={styles.heyText}>Hey, Halal</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ShoppingCart')}>
            <Image
              source={require('../assets/icon_bag.png')}
              style={styles.iconBag}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.bigText}>Your</Text>
        <Text style={styles.bigTextBold}>Favourites</Text>
      </View>
      {(!favourites || favourites.length === 0) ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favourite items yet!</Text>
        </View>
      ) : (
        <FlatList
          data={favourites}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#2A4BA0']}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  headerBlue: {
    width: '100%',
    height: 280,
    backgroundColor: '#2A4BA0',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heyText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#F8F9FB',
    fontFamily: 'Manrope',
  },
  bigText: {
    fontSize: 50,
    color: 'white',
    marginTop: 25,
    fontWeight: '300',
    marginLeft: 0,
  },
  bigTextBold: {
    fontSize: 50,
    color: 'white',
    marginTop: 15,
    fontWeight: '800',
    marginLeft: 0,
  },
  listContainer: {
    padding: 16,
    paddingTop: 20,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    marginLeft: 16,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2530',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#2A4BA0',
    fontWeight: '600',
  },
  favouriteButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -100,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#616A7D',
  },
  iconBag: {
    width: 18,
    height: 20,
    marginLeft: 270,
    marginTop: 3,
  },
}); 