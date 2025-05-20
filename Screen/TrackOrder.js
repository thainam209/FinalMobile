import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function TrackOrder({ navigation, route }) {
  const { orderId } = route.params;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#2A4BA0" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Order</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <Image
          source={require('../assets/map.jpg')} // Thay bằng hình ảnh bản đồ của bạn
          style={styles.mapImage}
        />
        <Image
          source={require('../assets/xe.png')} // Biểu tượng xe giao hàng
          style={styles.deliveryIcon}
        />
        <Image
          source={require('../assets/dich.png')} // Biểu tượng điểm đến
          style={styles.destinationIcon}
        />
      </View>

      {/* Delivery Info */}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Icon name="person" size={24} color="#2A4BA0" />
          <Text style={styles.infoText}>Rakibul Hassan</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="timer" size={24} color="#2A4BA0" />
          <Text style={styles.infoText}>Delivery in 25 MIN</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="location-on" size={24} color="#2A4BA0" />
          <Text style={styles.infoText}>37 New Line, Sunamganj</Text>
        </View>
      </View>

      {/* Order Details */}
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.orderDetailsTitle}>Order Details</Text>
        <Text style={styles.orderId}>ID: {orderId}</Text>
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
  mapContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    margin: 20,
    borderRadius: 16,
    backgroundColor: '#E0E0E0',
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  deliveryIcon: {
    position: 'absolute',
    width: 80,
    height: 80,
    bottom: 50,
    left: 100,
  },
  destinationIcon: {
    position: 'absolute',
    width: 60,
    height: 60,
    top: 50,
    right: 100,
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2530',
    marginLeft: 10,
  },
  orderDetailsContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 20,
  },
  orderDetailsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A2530',
    marginBottom: 10,
  },
  orderId: {
    fontSize: 14,
    color: '#616A7D',
  },
});