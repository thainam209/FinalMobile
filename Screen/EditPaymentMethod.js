import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function EditPaymentMethod({ navigation, route }) {
  const [cardType, setCardType] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Kiểm tra nếu là chỉnh sửa (route.params.item có dữ liệu)
  useEffect(() => {
    if (route.params?.item) {
      setCardType(route.params.item.title);
      const [number, expiry] = route.params.item.detail.split('\nExpiry: ');
      setCardNumber(number);
      setExpiryDate(expiry);
      setCardHolder(''); // Giả lập, bạn có thể thêm trường này vào dữ liệu gốc
      setIsEditing(true);
    }
  }, [route.params]);

  const handleSave = () => {
    // Logic lưu thẻ (gọi API hoặc lưu vào state toàn cục)
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
          {isEditing ? 'Edit Payment Method' : 'Add New Payment Method'}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Form nhập thông tin */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>CARD TYPE</Text>
          <TextInput
            style={styles.input}
            value={cardType}
            onChangeText={setCardType}
            placeholder="E.g., Visa, MasterCard"
            placeholderTextColor="#8891A5"
          />

          <Text style={styles.label}>CARD NUMBER</Text>
          <TextInput
            style={styles.input}
            value={cardNumber}
            onChangeText={setCardNumber}
            placeholder="**** **** **** ****"
            placeholderTextColor="#8891A5"
            keyboardType="numeric"
            maxLength={19} // 16 số + 3 khoảng trắng
          />

          <Text style={styles.label}>EXPIRY DATE</Text>
          <TextInput
            style={styles.input}
            value={expiryDate}
            onChangeText={setExpiryDate}
            placeholder="MM/YY"
            placeholderTextColor="#8891A5"
            maxLength={5} // Định dạng MM/YY
          />

          <Text style={styles.label}>CARD HOLDER NAME</Text>
          <TextInput
            style={styles.input}
            value={cardHolder}
            onChangeText={setCardHolder}
            placeholder="Enter cardholder's name"
            placeholderTextColor="#8891A5"
          />

          {/* Nút Save */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>
              {isEditing ? 'Save Changes' : 'Add Payment Method'}
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