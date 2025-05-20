import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function AddNewAddress({ navigation, route }) {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Kiểm tra nếu là chỉnh sửa (route.params.item có dữ liệu)
  useEffect(() => {
    if (route.params?.item) {
      setTitle(route.params.item.title);
      setDetail(route.params.item.detail);
      setIsEditing(true);
    }
  }, [route.params]);

  const handleSave = () => {
    // Logic lưu địa chỉ (gọi API hoặc lưu vào state toàn cục)
    // Ở đây chỉ điều hướng về AddressPayment
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#2A4BA0" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isEditing ? 'Edit Address' : 'Add New Address'}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Form nhập thông tin */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>TITLE</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="E.g., Home, Work"
            placeholderTextColor="#8891A5"
          />

          <Text style={styles.label}>ADDRESS DETAIL</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            value={detail}
            onChangeText={setDetail}
            placeholder="Enter your full address"
            placeholderTextColor="#8891A5"
            multiline
            numberOfLines={4}
          />

          {/* Nút Save */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>
              {isEditing ? 'Save Changes' : 'Add Address'}
            </Text>
          </TouchableOpacity>
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
    flexGrow: 1,
    paddingBottom: 20,
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A2530',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#1A2530',
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#2A4BA0',
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});