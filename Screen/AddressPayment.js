import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function AddressPayment({ navigation }) {
  const [addresses, setAddresses] = useState([
    { id: '1', title: 'Home', detail: '123 Green Way, Sylhet, Vietnam', isDefault: false },
    { id: '2', title: 'Work', detail: '456 Blue Street, Hanoi, Vietnam', isDefault: true },
  ]);

  const [cards, setCards] = useState([
    { id: '1', title: 'Visa', detail: '**** **** **** 1234\nExpiry: 12/25' },
    { id: '2', title: 'MasterCard', detail: '**** **** **** 5678\nExpiry: 06/26' },
  ]);

  const renderAddress = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemHeader}>
        <View style={styles.itemIcon}>
          <Icon name="location-on" size={20} color="#2A4BA0" />
        </View>
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDetail}>{item.detail}</Text>
          {item.isDefault && (
            <Text style={styles.defaultText}>Default</Text>
          )}
        </View>
        <View style={styles.itemActions}>
          <TouchableOpacity onPress={() => navigation.navigate('AddNewAddress', { item })}>
            <Icon name="edit" size={20} color="#2A4BA0" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => {
              setAddresses(addresses.filter(i => i.id !== item.id));
            }}
          >
            <Icon name="delete" size={20} color="#FF6347" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.setDefaultButton}>
        <Text style={styles.setDefaultText}>Set as Default</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCard = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemHeader}>
        <View style={styles.itemIcon}>
          <Icon name="credit-card" size={20} color="#FF6347" />
        </View>
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDetail}>{item.detail}</Text>
        </View>
        <View style={styles.itemActions}>
          <TouchableOpacity onPress={() => navigation.navigate('EditPaymentMethod', { item })}>
            <Icon name="edit" size={20} color="#2A4BA0" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => {
              setCards(cards.filter(i => i.id !== item.id));
            }}
          >
            <Icon name="delete" size={20} color="#FF6347" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#2A4BA0" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Address & Payment</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Nội dung */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Phần địa chỉ */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Addresses</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AddNewAddress')}>
              <Text style={styles.addButtonText}>+ Add New</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={addresses}
            renderItem={renderAddress}
            keyExtractor={(item) => item.id}
            nestedScrollEnabled={true}
            scrollEnabled={false}
            contentContainerStyle={styles.listContainer}
          />
        </View>

        {/* Phần thẻ thanh toán */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Payment Methods</Text>
            <TouchableOpacity onPress={() => navigation.navigate('EditPaymentMethod')}>
              <Text style={styles.addButtonText}>+ Add New</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={cards}
            renderItem={renderCard}
            keyExtractor={(item) => item.id}
            nestedScrollEnabled={true}
            scrollEnabled={false}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      </ScrollView>
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
  scrollContent: {
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A2530',
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2A4BA0',
  },
  listContainer: {
    paddingVertical: 5,
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    marginRight: 10,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2530',
    marginBottom: 5,
  },
  itemDetail: {
    fontSize: 14,
    color: '#616A7D',
  },
  defaultText: {
    fontSize: 12,
    color: '#2A4BA0',
    fontWeight: '600',
    marginTop: 5,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    marginLeft: 10,
  },
  setDefaultButton: {
    backgroundColor: '#2A4BA0',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  setDefaultText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});