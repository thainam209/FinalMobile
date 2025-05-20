// import React from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
// import { TextInput } from 'react-native-gesture-handler';

// const Deal = ({ color, number, money, content }) => {
//   return (
//     <TouchableOpacity style={[styles.box, { backgroundColor: color }]}>
//       <View style={{ flexDirection: 'row' }}>
//         <Text style={styles.number}>{number}</Text>
//         <Text style={styles.money}>{money}</Text>
//       </View>
//       <Text style={styles.content}>{content}</Text>
//     </TouchableOpacity>
//   );
// };

// const Product = ({ Image, price, description, onPress }) => {
//   return (
//     <View style={styles.productContainer}>
//       <ImageBackground
//         source={Image}
//         style={{ flex: 1 }}
//         imageStyle={{ width: 80, height: 80, alignItems: 'center' }}
//       >
//         <TouchableOpacity
//           style={{ borderRadius: 100, width: 28, height: 28, backgroundColor: '#153075', alignItems: 'center', paddingTop: 2, marginTop: 80, marginLeft: 130 }}
//           onPress={onPress}
//         >
//           <Text style={{ color: 'white', fontWeight: 600, fontSize: 18 }}>+</Text>
//         </TouchableOpacity>
//         <Text style={{ fontWeight: 'bold', fontSize: 14, marginLeft: 18, marginTop: 20 }}>{price}</Text>
//         <Text style={{ color: '#616A7D', fontWeight: 400, fontSize: 12, width: 112, marginLeft: 18, marginTop: 10 }}>{description}</Text>
//       </ImageBackground>
//     </View>
//   );
// };

// export default function Home({ navigation }) {
//   return (
//     <View style={{ flex: 1 }}>
//       <View style={styles.header}>
//         <View style={{ flexDirection: 'row', marginTop: 60, marginLeft: 20 }}>
//           <Text style={{ fontSize: 22, fontWeight: 600, fontFamily: 'Manrope', color: '#F8F9FB' }}>
//             Hey, Halal
//           </Text>
//           <TouchableOpacity onPress={() => navigation.navigate('ShoppingCart')}>
//             <Image
//               source={require('../assets/icon_bag.png')}
//               style={{ width: 18, height: 20, marginLeft: 270, marginTop: 3 }}
//             />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.search}>
//           <Image
//             source={require('../assets/icon_search.png')}
//             style={{ width: 20, height: 20, marginLeft: 30 }}
//           />
//           <TextInput placeholder='Search Products or store' placeholderTextColor='#8891A5' style={{ marginLeft: 10, fontSize: '16', fontWeight: 500, color: 'white' }} />
//         </View>
//         <View style={styles.text}>
//           <Text style={styles.text1}>DELIVERY TO</Text>
//           <Text style={styles.text1}>WITHIN</Text>
//         </View>
//         <View style={styles.text}>
//           <View style={{ flexDirection: 'row' }}>
//             <Text style={styles.text2}>Green Way 3000, Sylhet</Text>
//             <Image
//               source={require('../assets/icon_muiten.png')}
//               style={{ marginLeft: 10, marginTop: 6, marginRight: 153 }}
//             />
//           </View>
//           <View style={{ flexDirection: 'row' }}>
//             <Text style={styles.text2}>1 Hour</Text>
//             <Image
//               source={require('../assets/icon_muiten.png')}
//               style={{ marginLeft: 10, marginTop: 6 }}
//             />
//           </View>
//         </View>
//       </View>
//       <ScrollView style={{ flex: 1 }}>
//         <View style={styles.bannerCard}>
//           <Deal
//             color="#FFC83A"
//             number="346"
//             money="USD"
//             content="Your total savings"
//           />
//           <Deal
//             color="#E4DDCB"
//             number="215"
//             money="HRS"
//             content="Your time saved"
//           />
//         </View>
//         <Text style={{ fontSize: 20, fontWeight: 700, marginTop: 30, marginLeft: 25 }}>
//           Deals on Fruits & Tea
//         </Text>
//         <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
//           <Product
//             Image={require('../assets/icon_image.png')}
//             price="$325"
//             description="Orange Package 1 | 1 bundle"
//             onPress={() => navigation.navigate('ProductDetails')}
//           />
//           <Product
//             Image={require('../assets/icon_image.png')}
//             price="$89"
//             description="Green Tea Package 2 | 1 bundle"
//             onPress={() => navigation.navigate('ProductDetails')}
//           />
//           <Product
//             Image={require('../assets/icon_image.png')}
//             price="$325"
//             description="Orange Package 1 | 1 bundle"
//             onPress={() => navigation.navigate('ProductDetails')}
//           />
//           <Product
//             Image={require('../assets/icon_image.png')}
//             price="$89"
//             description="Green Tea Package 2 | 1 bundle"
//             onPress={() => navigation.navigate('ProductDetails')}
//           />
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   header: {
//     width: '100%',
//     height: 280,
//     backgroundColor: '#2A4BA0',
//   },
//   search: {
//     width: 380,
//     height: 60,
//     backgroundColor: '#153075',
//     borderRadius: 28,
//     marginTop: 38,
//     marginLeft: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 30
//   },
//   text: {
//     flexDirection: 'row',
//     marginLeft: 20,
//     marginTop: 10
//   },
//   text1: {
//     fontSize: 12,
//     fontFamily: 'Manrope',
//     fontWeight: 800,
//     color: '#AAAAAA',
//     marginRight: 250
//   },
//   text2: {
//     fontSize: 14,
//     fontFamily: 'Manrope',
//     fontWeight: 500,
//     color: '#F8F9FB',
//   },
//   bannerCard: {
//     flexDirection: 'row',
//     marginTop: 30,
//   },
//   box: {
//     width: 178,
//     height: 123,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 16,
//     marginLeft: 25,
//   },
//   number: {
//     fontSize: 26,
//     fontWeight: 'bold',
//   },
//   money: {
//     fontSize: 26,
//     fontWeight: 400,
//     marginLeft: 10,
//   },
//   content: {
//     fontSize: 14,
//     color: '#555',
//     textAlign: 'center',
//   },
//   productContainer: {
//     borderRadius: 16,
//     width: 178,
//     height: 210,
//     borderWidth: 1,
//     marginLeft: 25,
//     marginTop: 30
//   }
// });