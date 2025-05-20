import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './HomeScreen';
import CategoriesScreen from './CategoriesScreen';
import Favourites from './Favourites';
import MoreScreen from './MoreScreen';

const Tab = createBottomTabNavigator();

export default function Navigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Categories':
              iconName = 'category';
              break;
            case 'Favourite':
              iconName = 'favorite';
              break;
            case 'More':
              iconName = 'more-horiz';
              break;
            default:
              iconName = 'home';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2A4BA0',
        tabBarInactiveTintColor: '#8891A5',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderRadius: 40,
          height: 89,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          marginTop: 4,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Favourite" component={Favourites} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
} 