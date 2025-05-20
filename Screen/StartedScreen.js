import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function StartedScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/icon_image.png')}
        style={{ width: 129, height: 129, marginTop: 110, marginLeft: 150 }}
      />
      <View style={{ marginTop: 200, marginLeft: 42 }}>
        <Text style={{ fontSize: 30, fontWeight: 600, lineHeight: 38 }}>
          Your holiday{'\n'}shopping{'\n'}delivered to your
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 30, fontWeight: 600, lineHeight: 38 }}>home</Text>
          <Image
            source={require('../assets/icon_emoji.png')}
            style={{ width: 33.55, height: 33, marginLeft: 10 }}
          />
        </View>
        <Text style={{ lineHeight: 22, fontSize: 18, color: '#616A7D', marginTop: 15 }}>
          There's something for everyone{'\n'}
          to enjoy with Sweet Shop{'\n'}
          Favourites{'\n'}
        </Text>
        <Image
          source={require('../assets/icon_slider.png')}
          style={{ width: 102, marginTop: 30 }}
        />
      </View>
      <TouchableOpacity
        style={{
          borderRadius: 20,
          backgroundColor: '#153075',
          width: 327,
          height: 70,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 50,
          marginLeft: 50,
        }}
        onPress={() => navigation.navigate('SignIn')}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: '#FAFBFD', fontSize: 16, fontWeight: 500 }}>Get Started</Text>
          <Image
            source={require('../assets/icon_arrow.png')}
            style={{ width: 20, height: 20, marginLeft: 10 }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});