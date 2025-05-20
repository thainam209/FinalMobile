import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CartContext } from '../CartContext';
import { FavouritesContext } from '../FavouritesContext';

export default function ProductDetails({ navigation, route }) {
  const { productId } = route.params; // Lấy productId từ route param
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useContext(CartContext);
  const { toggleFavourite, isFavourite } = useContext(FavouritesContext);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        // Basic Auth
        const username = 'ck_a59139cb18853d141742ba07849849dd5ddf05d8';
        const password = 'cs_048b5f3a6e8be3a9698ccaa7a3a4a00cee653e02';
        const authString = `${username}:${password}`;
        const encodedAuth = btoa(authString);

        const response = await fetch(`https://test.dpaii.id.vn/index.php/wp-json/wc/v3/products/${productId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Basic ${encodedAuth}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2A4BA0" />
        <Text>Loading product details...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Product not found.</Text>
      </View>
    );
  }

  const handleToggleFavourite = () => {
    if (product) {
      const productData = {
        id: product.id,
        name: product.name,
        price: product.price,
        images: product.images,
        image: product.images && product.images.length > 0 ? product.images[0].src : null
      };
      console.log('Adding to favourites:', productData);
      toggleFavourite(productData);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#2A4BA0" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{product.name}</Text>
        <TouchableOpacity onPress={handleToggleFavourite}>
          <Icon 
            name={isFavourite(product.id) ? "favorite" : "favorite-border"} 
            size={24} 
            color={isFavourite(product.id) ? "#FF6B6B" : "#2A4BA0"} 
          />
        </TouchableOpacity>
      </View>
      <View style={styles.imagePlaceholder}>
        <Image
          source={
            product.images && product.images.length > 0
              ? { uri: product.images[0].src }
              : require('../assets/icon_image.png')
          }
          style={styles.productImage}
        />
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>{product.price} Vnđ</Text>
        {/* <Text style={styles.discount}>${product.regular_price} 20% OFF</Text>
        <View style={styles.rating}>
          <Icon name="star" size={16} color="#FFC107" />
          <Text style={styles.ratingText}>{product.average_rating}</Text>
          <Text style={styles.reviewCount}>(122 Reviews)</Text>
        </View> */}
        <TouchableOpacity style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>
          <Icon name="keyboard-arrow-down" size={24} color="#2A4BA0" />
        </TouchableOpacity>
        <Text style={styles.sectionContent}>
          {product.description ? product.description.replace(/<[^>]+>/g, '') : 'No details.'}
        </Text>
        <TouchableOpacity style={styles.section}>
          <Text style={styles.sectionTitle}>Reviews Facts</Text>
          <Icon name="keyboard-arrow-down" size={24} color="#2A4BA0" />
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => {
            addToCart({ id: product.id, name: product.name, price: product.price, 
              image: product.images && product.images.length > 0 ? product.images[0].src : null
             });
            navigation.navigate('ShoppingCart');
          }}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.buyNowButton}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  header: {
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2A4BA0',
  },
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0E0E0',
    height: 200,
    margin: 20,
    borderRadius: 16,
  },
  productImage: {
    width: 388,
    height: 200,
    borderRadius: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  productName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A2530',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2A4BA0',
    marginTop: 5,
  },
  discount: {
    fontSize: 14,
    color: '#616A7D',
    textDecorationLine: 'line-through',
    marginTop: 5,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
    color: '#1A2530',
  },
  reviewCount: {
    fontSize: 14,
    color: '#616A7D',
    marginLeft: 5,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2530',
  },
  sectionContent: {
    fontSize: 14,
    color: '#616A7D',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#2A4BA0',
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
    marginRight: 10,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#FFC83A',
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});