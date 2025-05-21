import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground, TextInput, FlatList, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Favourites from './Favourites';

// Component cho tab Home
const HomeContent = ({ navigation }) => {
  const Deal = ({ color, number, money, content }) => {
    return (
      <TouchableOpacity style={[styles.box, { backgroundColor: color }]}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.number}>{number}</Text>
          <Text style={styles.money}>{money}</Text>
        </View>
        <Text style={styles.content}>{content}</Text>
      </TouchableOpacity>
    );
  };

  const Product = ({ image, price, name, onPress }) => {
  return (
    <View style={styles.productContainer}>
      <ImageBackground
        source={image ? { uri: image } : require('../assets/icon_image.png')}
        style={{ flex: 1 }}
        imageStyle={{ width: 120, height: 110, marginLeft: 15, marginTop: 10, borderRadius: 16 }}
      >
        <TouchableOpacity
          style={{ borderRadius: 100, width: 28, height: 28, backgroundColor: '#153075', alignItems: 'center', paddingTop: 2, marginTop: 120, marginLeft: 130 }}
          onPress={onPress}
        >
          <Text style={{ color: 'white', fontWeight: 600, fontSize: 18 }}>+</Text>
        </TouchableOpacity>
        <Text style={{ fontWeight: 'bold', fontSize: 14, marginLeft: 18 }}>{price} Vnđ</Text>
        <Text style={{ color: 'black', fontWeight: 600, fontSize: 16, width: 150, marginLeft: 18,marginTop:5 }}>{name}</Text>
      </ImageBackground>
    </View>
    );
  };

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState(''); // Thêm state cho ô tìm kiếm

  // Hàm gọi API lấy danh sách sản phẩm
  const fetchProduct = async () => {
    try {
      const username = 'ck_a59139cb18853d141742ba07849849dd5ddf05d8';
      const password = 'cs_048b5f3a6e8be3a9698ccaa7a3a4a00cee653e02';
      const authString = `${username}:${password}`;
      const encodedAuth = btoa(authString);

      // Gọi API không truyền page, per_page
      const response = await fetch(`https://test.dpaii.id.vn/index.php/wp-json/wc/v3/products`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${encodedAuth}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      // Map dữ liệu để truyền vào Product component
      const mappedProducts = data.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.short_description ? product.short_description.replace(/<[^>]+>/g, '') : '',
        image: product.images && product.images.length > 0 ? product.images[0].src : null, // <-- chỉ lấy string URL
      }));

      setProducts(mappedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2A4BA0" />
        <Text>Loading products...</Text>
      </View>
    );
  }

  // Lọc sản phẩm theo tên để tìm kiếm
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', marginTop: 60, marginLeft: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: 600, fontFamily: 'Manrope', color: '#F8F9FB' }}>
            Hey, Halal
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('ShoppingCart')}>
            <Image
              source={require('../assets/icon_bag.png')}
              style={styles.iconBagHome}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.search}>
          <Image
            source={require('../assets/icon_search.png')}
            style={{ width: 20, height: 20, marginLeft: 30 }}
          />
          <TextInput
            placeholder='Search Products or store'
            placeholderTextColor='#8891A5'
            style={{ marginLeft: 10, fontSize: 16, fontWeight: 500, color: 'white' }}
            value={searchText}
            onChangeText={setSearchText} // Cập nhật giá trị tìm kiếm
          />
        </View>
        <View style={styles.text}>
          <Text style={styles.text1}>DELIVERY TO</Text>
          <Text style={styles.text1}>WITHIN</Text>
        </View>
        <View style={styles.text}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.text2}>Green Way 3000, Sylhet</Text>
            <Image
              source={require('../assets/icon_muiten.png')}
              style={{ marginLeft: 10, marginTop: 6, marginRight: 153 }}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.text2}>1 Hour</Text>
            <Image
              source={require('../assets/icon_muiten.png')}
              style={{ marginLeft: 10, marginTop: 6 }}
            />
          </View>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.bannerCard}>
          <Deal
            color="#FFC83A"
            number="346"
            money="USD"
            content="Your total savings"
          />
          <Deal
            color="#E4DDCB"
            number="215"
            money="HRS"
            content="Your time saved"
          />
        </View>
        <Text style={{ fontSize: 20, fontWeight: 700, marginTop: 30, marginLeft: 25 }}>
          Deals on Fruits & Tea
        </Text>
        <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
          <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
            {filteredProducts.map((product) => (
              <Product
                key={product.id}
                image={product.image}
                price={product.price}
                name={product.name}
                onPress={() => navigation.navigate('ProductDetails', { productId: product.id })}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// Component cho tab Categories
const CategoriesContent = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // Hàm gọi API
  const fetchProductCategories = async () => {
    try {
      const response = await fetch('https://test.dpaii.id.vn/index.php/wp-json/wp/v2/product_cat'); // Thay URL bằng API thực tế
      const data = await response.json();
      setCategories(data); // Lưu dữ liệu từ API vào state
    } catch (error) {
      console.error('Error fetching product categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductCategories();
  }, []);

  const Cate = ({ Image, name, content, onPress }) => {
    return (
      <View style={styles.productContainer}>
        <TouchableOpacity onPress={onPress}>
          <ImageBackground
            source={Image}
            style={{ flex: 1 }}
            imageStyle={{ width: 80, height: 80, alignItems: 'center', marginLeft: 45, marginTop: 20 }}
          >
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', width: 120, marginTop: 120, marginLeft: 28 }} />
          </ImageBackground>
        </TouchableOpacity>
        <View style={{ marginTop: 120 }}>
          <Text style={{ fontWeight: '600', fontSize: 14, textAlign: 'center', marginTop: 20 }}>{name}</Text>
          <Text style={{ color: '#616A7D', fontWeight: 400, fontSize: 12, textAlign: 'center', marginTop: 10 }}>{content}</Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2A4BA0" />
        <Text>Loading categories...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', marginTop: 60, marginLeft: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: 600, fontFamily: 'Manrope', color: '#F8F9FB' }}>
            Hey, Halal
          </Text>
          <TouchableOpacity onPress={() => setIsSearchVisible(!isSearchVisible)}>
            <Image
              source={require('../assets/icon_search.png')}
              style={{ width: 18, height: 20, marginLeft: 200, marginTop: 3 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ShoppingCart')}>
            <Image
              source={require('../assets/icon_bag.png')}
              style={{ width: 18, height: 20, marginLeft: 50, marginTop: 3 }}
            />
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 50, marginLeft: 20, color: 'white', marginTop: 25, fontWeight: 300 }}>
          Shop
        </Text>
        <Text style={{ fontSize: 50, marginLeft: 20, color: 'white', marginTop: 15, fontWeight: 800 }}>
          By Category
        </Text>
      </View>
      {isSearchVisible && (
        <View style={styles.searchOutsideHeader}>
          <Image
            source={require('../assets/icon_search.png')}
            style={{ width: 20, height: 20, marginLeft: 30 }}
          />
          <TextInput
            placeholder="Search Products or store"
            placeholderTextColor="#8891A5"
            style={{ marginLeft: 10, fontSize: 16, fontWeight: '500', color: '#1A2530', flex: 1 }}
          />
        </View>
      )}
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
          {categories.slice(1).map((category) => ( // Bỏ qua phần tử đầu tiên
            <Cate
              key={category.id} // Sử dụng id làm khóa
              Image={require('../assets/icon_image.png')}  // Thay bằng category.image nếu API trả về URL hình ảnh
              name={category.name}
              content={category.description}
              onPress={() => navigation.navigate('Products', { categoryId: category.id, categoryName: category.name })} // Chuyển categoryId và categoryName vào navigation
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

// Component cho tab More
const MoreContent = ({ navigation }) => {
  const options = [
    { id: '1', title: 'View Account Info', icon: 'person', screen: 'AccountInfo' },
    { id: '2', title: 'View Order History', icon: 'history', screen: 'Orders' },
    { id: '3', title: 'View Address & Payment', icon: 'credit-card', screen: 'AddressPayment' },
    { id: '4', title: 'Sign Out', icon: 'exit-to-app', screen: 'SignIn', isLogout: true },
  ];

  const renderOption = ({ item }) => (
    <TouchableOpacity
      style={[styles.optionButton, item.isLogout && styles.logoutButton]}
      onPress={() => navigation.navigate(item.screen)}
    >
      <View style={[styles.optionContent, { backgroundColor: item.isLogout ? '#BA0404' : '#2A4BA0' }]}>
        <Icon name={item.icon} size={24} color="#FFFFFF" style={styles.optionIcon} />
        <Text style={styles.optionButtonText}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', marginTop: 60, marginLeft: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: 600, fontFamily: 'Manrope', color: '#F8F9FB' }}>
            Hey, Halal
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('ShoppingCart')}>
            <Image
              source={require('../assets/icon_bag.png')}
              style={styles.iconBagHome}
            />
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 50, marginLeft: 20, color: 'white', marginTop: 25, fontWeight: 300 }}>
          More
        </Text>
        <Text style={{ fontSize: 50, marginLeft: 20, color: 'white', marginTop: 15, fontWeight: 800 }}>
          Options
        </Text>
      </View>
      <FlatList
        data={options}
        renderItem={renderOption}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.optionList}
        ListFooterComponent={<Text style={styles.message}>More options coming soon!</Text>}
      />
    </View>
  );
};

// MainScreen với footer navigation
export default function MainScreen({ navigation }) {
  const [selectedTab, setSelectedTab] = useState('Home');

  const renderContent = () => {
    switch (selectedTab) {
      case 'Home':
        return <HomeContent navigation={navigation} />;
      case 'Categories':
        return <CategoriesContent navigation={navigation} />;
      case 'Favourite':
        return <Favourites navigation={navigation} />;
      case 'More':
        return <MoreContent navigation={navigation} />;
      default:
        return <HomeContent navigation={navigation} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderContent()}
      <View style={styles.tabBar}>
        {[
          { name: 'Home', icon: 'home' },
          { name: 'Categories', icon: 'category' },
          { name: 'Favourite', icon: 'favorite' },
          { name: 'More', icon: 'more-horiz' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabItem}
            onPress={() => setSelectedTab(tab.name)}
          >
            <Icon
              name={tab.icon}
              size={24}
              color={selectedTab === tab.name ? '#2A4BA0' : '#8891A5'}
            />
            <Text style={selectedTab === tab.name ? styles.activeTab : styles.inactiveTab}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    height: 89,
    paddingBottom: 10,
    paddingTop: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  activeTab: {
    color: '#2A4BA0',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 4,
  },
  inactiveTab: {
    color: '#8891A5',
    fontSize: 12,
    marginTop: 4,
  },
  header: {
    width: '100%',
    height: 280,
    backgroundColor: '#2A4BA0',
  },
  search: {
    width: 380,
    height: 60,
    backgroundColor: '#153075',
    borderRadius: 28,
    marginTop: 38,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  searchOutsideHeader: {
    width: 380,
    height: 60,
    backgroundColor: '#F8F9FB',
    borderRadius: 28,
    marginTop: 10,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 10,
  },
  text1: {
    fontSize: 12,
    fontFamily: 'Manrope',
    fontWeight: '800',
    color: '#AAAAAA',
    marginRight: 250,
  },
  text2: {
    fontSize: 14,
    fontFamily: 'Manrope',
    fontWeight: '500',
    color: '#F8F9FB',
  },
  bannerCard: {
    flexDirection: 'row',
    marginTop: 30,
  },
  box: {
    width: 178,
    height: 123,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginLeft: 25,
  },
  number: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  money: {
    fontSize: 26,
    fontWeight: '400',
    marginLeft: 10,
  },
  content: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  productContainer: {
    borderRadius: 16,
    width: 178,
    height: 210,
    borderWidth: 1,
    marginLeft: 25,
    marginTop: 30,
  },
  scrollContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  message: {
    fontSize: 16,
    color: '#616A7D',
    marginTop: 20,
    textAlign: 'center',
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
  iconBagHome: {
    width: 18,
    height: 20,
    marginLeft: 270,
    marginTop: 3,
  },
});