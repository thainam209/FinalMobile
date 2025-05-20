import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

export default function Categories({ navigation }) {
  const [selectedTab, setSelectedTab] = useState('');

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
    navigation.navigate(tab);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', marginTop: 60, marginLeft: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: 600, fontFamily: 'Manrope', color: '#F8F9FB' }}>
            Hey, Halal
          </Text>
          <Image
            source={require('../assets/icon_search.png')}
            style={{ width: 18, height: 20, marginLeft: 200, marginTop: 3 }}
          />
          <Image
            source={require('../assets/icon_bag.png')}
            style={{ width: 18, height: 20, marginLeft: 50, marginTop: 3 }}
          />
        </View>
        <Text style={{ fontSize: 50, marginLeft: 20, color: 'white', marginTop: 25, fontWeight: 300 }}>
          Shop
        </Text>
        <Text style={{ fontSize: 50, marginLeft: 20, color: 'white', marginTop: 15, fontWeight: 800 }}>
          By Category
        </Text>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
          <Cate
            Image={require('../assets/icon_image.png')}
            name="Fishes"
            content="From Sea"
            onPress={() => navigation.navigate('ProductDetails')}
          />
          <Cate
            Image={require('../assets/icon_image.png')}
            name="Meats"
            content="Organic"
            onPress={() => navigation.navigate('ProductDetails')}
          />
          <Cate
            Image={require('../assets/icon_image.png')}
            name="Vegetables"
            content="Organic"
            onPress={() => navigation.navigate('ProductDetails')}
          />
          <Cate
            Image={require('../assets/icon_image.png')}
            name="Fruits"
            content="Fresh & Organic"
            onPress={() => navigation.navigate('ProductDetails')}
          />
          <Cate
            Image={require('../assets/icon_image.png')}
            name="Fruits"
            content="Fresh & Organic"
            onPress={() => navigation.navigate('ProductDetails')}
          />
          <Cate
            Image={require('../assets/icon_image.png')}
            name="Fruits"
            content="Fresh & Organic"
            onPress={() => navigation.navigate('ProductDetails')}
          />
        </View>
      </ScrollView>
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
            onPress={() => handleTabPress(tab.name)}
          >
            <Icon
              name={tab.icon}
              size={24}
              color={selectedTab === tab.name ? 'blue' : 'black'}
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
  header: {
    width: '100%',
    height: 280,
    backgroundColor: '#2A4BA0',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    height: 89
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  activeTab: {
    color: 'blue',
    fontWeight: 'bold',
  },
  inactiveTab: {
    color: '#8891A5',
    marginTop: 4
  },
  productContainer: {
    borderRadius: 16,
    width: 170,
    height: 200,
    borderWidth: 1,
    marginLeft: 25,
    marginTop: 30,
    backgroundColor: '#F8F9FB'
  }
});


// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground, ActivityIndicator } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// // Hàm giả lập gọi API (thay bằng API thực tế của bạn)
// const fetchProductCategories = async () => {
//   try {
//     const response = await fetch('https://example.com/api/product_cat'); // Thay URL bằng API thực tế
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching product categories:', error);
//     throw error;
//   }
// };

// const Cate = ({ Image, name, content, onPress }) => {
//   return (
//     <View style={styles.productContainer}>
//       <TouchableOpacity onPress={onPress}>
//         <ImageBackground
//           source={Image}
//           style={{ flex: 1 }}
//           imageStyle={{ width: 80, height: 80, alignItems: 'center', marginLeft: 45, marginTop: 20 }}
//         >
//           <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', width: 120, marginTop: 120, marginLeft: 28 }} />
//         </ImageBackground>
//       </TouchableOpacity>
//       <View style={{ marginTop: 120 }}>
//         <Text style={{ fontWeight: '600', fontSize: 14, textAlign: 'center', marginTop: 20 }}>{name}</Text>
//         <Text style={{ color: '#616A7D', fontWeight: 400, fontSize: 12, textAlign: 'center', marginTop: 10 }}>{content}</Text>
//       </View>
//     </View>
//   );
// };

// export default function Categories({ navigation }) {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadCategories = async () => {
//       try {
//         const data = await fetchProductCategories();
//         setCategories(data); // Lưu dữ liệu từ API vào state
//       } catch (error) {
//         console.error('Failed to load categories:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadCategories();
//   }, []);

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" color="#2A4BA0" />
//         <Text>Loading categories...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={{ flex: 1 }}>
//       <View style={styles.header}>
//         <View style={{ flexDirection: 'row', marginTop: 60, marginLeft: 20 }}>
//           <Text style={{ fontSize: 22, fontWeight: 600, fontFamily: 'Manrope', color: '#F8F9FB' }}>
//             Hey, Halal
//           </Text>
//           <Image
//             source={require('../assets/icon_search.png')}
//             style={{ width: 18, height: 20, marginLeft: 200, marginTop: 3 }}
//           />
//           <Image
//             source={require('../assets/icon_bag.png')}
//             style={{ width: 18, height: 20, marginLeft: 50, marginTop: 3 }}
//           />
//         </View>
//         <Text style={{ fontSize: 50, marginLeft: 20, color: 'white', marginTop: 25, fontWeight: 300 }}>
//           Shop
//         </Text>
//         <Text style={{ fontSize: 50, marginLeft: 20, color: 'white', marginTop: 15, fontWeight: 800 }}>
//           By Category
//         </Text>
//       </View>
//       <ScrollView style={{ flex: 1 }}>
//         <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
//           {categories.map((category, index) => (
//             <Cate
//               key={index}
//               Image={require('../assets/icon_image.png')} // Thay bằng category.image nếu API trả về URL hình ảnh
//               name={category.name}
//               content={category.description}
//               onPress={() => navigation.navigate('ProductDetails', { categoryId: category.id })}
//             />
//           ))}
//         </View>
//       </ScrollView>
//       <View style={styles.tabBar}>
//         {[
//           { name: 'Home', icon: 'home' },
//           { name: 'Categories', icon: 'category' },
//           { name: 'Favourite', icon: 'favorite' },
//           { name: 'More', icon: 'more-horiz' },
//         ].map((tab) => (
//           <TouchableOpacity
//             key={tab.name}
//             style={styles.tabItem}
//             onPress={() => setSelectedTab(tab.name)}
//           >
//             <Icon
//               name={tab.icon}
//               size={24}
//               color={selectedTab === tab.name ? 'blue' : 'black'}
//             />
//             <Text style={selectedTab === tab.name ? styles.activeTab : styles.inactiveTab}>
//               {tab.name}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   header: {
//     width: '100%',
//     height: 280,
//     backgroundColor: '#2A4BA0',
//   },
//   tabBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 40,
//     height: 89
//   },
//   tabItem: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   activeTab: {
//     color: 'blue',
//     fontWeight: 'bold',
//   },
//   inactiveTab: {
//     color: '#8891A5',
//     marginTop: 4
//   },
//   productContainer: {
//     borderRadius: 16,
//     width: 170,
//     height: 200,
//     borderWidth: 1,
//     marginLeft: 25,
//     marginTop: 30,
//     backgroundColor: '#F8F9FB'
//   }
// });