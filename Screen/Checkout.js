import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddressItem = ({ type, address, isSelected, onSelect }) => {
  return (
    <TouchableOpacity style={styles.addressItem} onPress={onSelect}>
      <View style={styles.addressDetails}>
        <Text style={styles.addressType}>{type}</Text>
        <Text style={styles.addressText}>{address}</Text>
      </View>
      {isSelected ? (
        <Icon name="check-circle" size={24} color="#FFC83A" />
      ) : (
        <TouchableOpacity>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default function Checkout({ navigation, route }) {
  const addresses = [
    { id: '1', type: 'Home', address: '36 green way, Sunamganj' },
    { id: '2', type: 'Office', address: 'Medical road, Halal lab, Sunamganj' },
  ];

  const { subtotal } = route.params;

  const [selectedAddress, setSelectedAddress] = React.useState(addresses[0].id);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#2A4BA0" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <FlatList
          data={addresses}
          renderItem={({ item }) => (
            <AddressItem
              type={item.type}
              address={item.address}
              isSelected={selectedAddress === item.id}
              onSelect={() => setSelectedAddress(item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.addressList}
        />
        <TouchableOpacity style={styles.addNewAddress}>
          <Text style={styles.addNewText}>+ Add New Address</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.addCardButton}
        onPress={() => navigation.navigate('AddNewCard', { subtotal })}
      >
        <Text style={styles.addCardText}>Add Card</Text>
      </TouchableOpacity>
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
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A2530',
    marginBottom: 20,
  },
  addressList: {
    paddingBottom: 20,
  },
  addressItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
  },
  addressDetails: {
    flex: 1,
  },
  addressType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2530',
  },
  addressText: {
    fontSize: 14,
    color: '#616A7D',
    marginTop: 5,
  },
  editText: {
    fontSize: 14,
    color: '#2A4BA0',
    fontWeight: '600',
  },
  addNewAddress: {
    alignItems: 'center',
    marginTop: 10,
  },
  addNewText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2A4BA0',
  },
  addCardButton: {
    backgroundColor: '#2A4BA0',
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
    margin: 20,
  },
  addCardText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});