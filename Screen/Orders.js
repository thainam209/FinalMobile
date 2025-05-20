import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const OrderItem = ({ item, onTrackPress }) => {
  return (
    <View style={styles.orderItem}>
      <Image source={item.image} style={styles.orderImage} />
      <View style={styles.orderDetails}>
        <Text style={styles.orderName}>{item.name}</Text>
        <Text style={styles.orderPrice}>{item.price}</Text>
        <Text style={styles.orderDate}>{item.date}</Text>
        <View style={styles.orderStatus}>
          <Text style={[styles.statusText, item.status === 'Success' ? styles.success : styles.onTheWay]}>
            {item.status}
          </Text>
          {item.status === 'On the way' && (
            <TouchableOpacity style={styles.trackButton} onPress={onTrackPress}>
              <Text style={styles.trackButtonText}>Track Order</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default function Orders({ navigation }) {
  const orders = [
    { id: '1', name: 'Fresh Orange', price: '$37.80', date: '2022-03-21', status: 'On the way', orderId: '#7654535', image: require('../assets/fresh_orange.jpg') },
    { id: '2', name: 'Orange', price: '$37.80', date: '2022-03-21', status: 'Success', orderId: '#7654535', image: require('../assets/orange.jpg') },
    { id: '3', name: 'Apple', price: '$37.80', date: '2022-03-21', status: 'Success', orderId: '#7654535', image: require('../assets/apple.jpg') },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#2A4BA0" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Orders</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Order List */}
      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <OrderItem
            item={item}
            onTrackPress={() => navigation.navigate('TrackOrder', { orderId: item.orderId })}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.orderList}
      />
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
  orderList: {
    padding: 20,
  },
  orderItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  orderImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  orderDetails: {
    flex: 1,
    marginLeft: 15,
  },
  orderName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2530',
  },
  orderPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2A4BA0',
    marginTop: 5,
  },
  orderDate: {
    fontSize: 14,
    color: '#616A7D',
    marginTop: 5,
  },
  orderStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  success: {
    color: '#28A745',
  },
  onTheWay: {
    color: '#FF6347',
  },
  trackButton: {
    backgroundColor: '#2A4BA0',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  trackButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});