import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const BackButton = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={{ fontWeight: '600', fontSize: 16 }}>
          {"<"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Product = ({ Image, price, name, onPress }) => {
    return (
    <View style={styles.productContainer}>
      <ImageBackground
        source={Image}
        style={{flex: 1}}
        imageStyle={{width:110,height:110,marginTop:10,marginLeft:15,borderRadius:16}}
        >
        <TouchableOpacity onPress={onPress}
        style={{borderRadius:100,width:28,height:28,backgroundColor:'#153075',alignItems:'center',paddingTop:2,marginTop:90,marginLeft:130}}>
          <Text style={{color:'white',fontWeight:600,fontSize:18}}>+</Text>
        </TouchableOpacity>
        <Text style={{fontWeight:'bold',fontSize:14,marginLeft:18,marginTop:20}}>{price} vnđ</Text>
        <Text style={{color:'black',fontWeight:600,fontSize:15,width:130,marginLeft:18,marginTop:10}}>{name}</Text>
      </ImageBackground>
    </View>
  );
};

export default function Products({ navigation, route }) {
  const { categoryId, categoryName } = route.params; // Lấy categoryId từ route.params
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hàm gọi API lấy danh sách sản phẩm
  const fetchProduct = async () => {
    try {
      // Tạo chuỗi xác thực Basic Auth
      const username = 'ck_a59139cb18853d141742ba07849849dd5ddf05d8'; 
      const password = 'cs_048b5f3a6e8be3a9698ccaa7a3a4a00cee653e02'; 
      const authString = `${username}:${password}`;
      const encodedAuth = btoa(authString); // Mã hóa Base64

      let allProducts = []; // Mảng để lưu tất cả sản phẩm
      let page = 1; // Bắt đầu từ trang đầu tiên
      let hasMoreProducts = true;

      while (hasMoreProducts) {
        // Gọi API với tham số `page`
        const response = await fetch(`https://test.dpaii.id.vn/index.php/wp-json/wc/v3/products?page=${page}&per_page=50`, {
          method: 'GET',
          headers: {
            'Authorization': `Basic ${encodedAuth}`, // Thêm Basic Auth vào header
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (data.length > 0) {
          allProducts = [...allProducts, ...data]; // Thêm sản phẩm từ trang hiện tại vào mảng
          page++; // Tăng giá trị `page` để gọi trang tiếp theo
        } else {
          hasMoreProducts = false; // Dừng vòng lặp nếu không còn sản phẩm
        }
      }

      console.log('All Products:', allProducts); // Kiểm tra tất cả sản phẩm đã lấy

      // Lọc các sản phẩm có categories chứa categoryId và lấy ảnh từ images
      const filteredProducts = allProducts.filter((product) => {
        return product.categories.some((category) => category.id === categoryId);
      }).map((product) => {
        // Lấy URL ảnh từ images (nếu có)
        const imageUrl = product.images && product.images.length > 0 ? product.images[0].src : null;
        return {
          ...product,
          image: imageUrl, // Thêm trường image chứa URL ảnh
        };
      });

      setProducts(filteredProducts); // Lưu danh sách sản phẩm đã lọc vào state
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
    return (
    <View style={{backgroundColor:'#FFFFFF', flex: 1}}>
        <View style={styles.header}>
            <BackButton navigation={navigation} />
            <View style={{width:150,marginLeft:40,marginTop: 13,height:30}}>
                {/* phần tên danh mục ở đây, sau này sẽ thay text thành tên danh mục */}
                <Text style={{fontSize:20,lineHeight:24}}>{categoryName}</Text>
            </View>
            <Image
                source={require('../assets/icon_search(black).png')}
                style={{marginTop:15,marginLeft: 45}}
            />
            <TouchableOpacity onPress={() => navigation.navigate('ShoppingCart')}>
                <Image
                    source={require('../assets/icon_bag(black).png')}
                    style={{marginTop:15,marginLeft: 45}}
                />
            </TouchableOpacity>
        </View>
        <ScrollView style={{flex:1}}>
          <View style={{flexWrap:'wrap', flexDirection:'row'}}>
            {products.map((product) => (
              <Product
                key={product.id}
                Image={{ uri: product.image }} // Sử dụng URL hình ảnh từ API
                price={product.price}
                name={product.name}
                onPress={() => navigation.navigate('ProductDetails', { productId: product.id })} // Chuyển đến
              />
            ))}
          </View>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginTop: 60,
  },
  productContainer: {
    borderRadius: 16,
    width:170,
    height:200,
    borderWidth: 1,
    marginLeft:25,
    marginTop:30,
    backgroundColor:'#F8F9FB'
  },
  number: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  money: {
    fontSize: 26,
    fontWeight:400,
    marginLeft: 10,
  },
  content: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  productContainer: {
    borderRadius: 16,
    width:178,
    height:210,
    borderWidth: 1,
    marginLeft:25,
    marginTop:30,
    backgroundColor:'#F8F9FB'
  },
  button: {
    borderRadius:100,
    width: 50,
    height: 50,
    backgroundColor: '#F8F9FB',
    color:'black',
    fontWeight:600,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
});