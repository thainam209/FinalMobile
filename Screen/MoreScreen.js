import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function MoreScreen({ navigation }) {
  const options = [
    { id: '1', title: 'View Account Info', icon: 'person', screen: 'AccountInfo' },
    { id: '2', title: 'View Order History', icon: 'history', screen: 'Orders' },
    { id: '3', title: 'View Address & Payment', icon: 'credit-card', screen: 'AddressPayment' },
    { id: '4', title: 'Sign Out', icon: 'exit-to-app', screen: 'SignIn', isLogout: true },
  ];

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', marginTop: 60, marginLeft: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: 600, fontFamily: 'Manrope', color: '#F8F9FB' }}>
            Hey, Halal
          </Text>
        </View>
        <Text style={{ fontSize: 50, marginLeft: 20, color: 'white', marginTop: 25, fontWeight: 300 }}>
          More
        </Text>
        <Text style={{ fontSize: 50, marginLeft: 20, color: 'white', marginTop: 15, fontWeight: 800 }}>
          Options
        </Text>
      </View>
      <View style={styles.scrollContent}>
        <View style={styles.optionList}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[styles.optionButton, option.isLogout && styles.logoutButton]}
              onPress={() => navigation.navigate(option.screen)}
            >
              <View style={[styles.optionContent, { backgroundColor: option.isLogout ? '#BA0404' : '#2A4BA0' }]}>
                <Icon name={option.icon} size={24} color="#FFFFFF" style={styles.optionIcon} />
                <Text style={styles.optionButtonText}>{option.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 280,
    backgroundColor: '#2A4BA0',
  },
  scrollContent: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionList: {
    paddingVertical: 20,
    width: '90%',
    alignSelf: 'center',
  },
  optionButton: {
    width: '100%',
    marginBottom: 15,
    borderRadius: 12,
    elevation: 5,
  },
  logoutButton: {
    marginTop: 10,
  },
  optionContent: {
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  optionIcon: {
    marginRight: 15,
  },
  optionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
}); 