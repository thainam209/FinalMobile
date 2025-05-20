import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  const loadFavourites = async () => {
    try {
      const storedFavourites = await AsyncStorage.getItem('favourites');
      console.log('Loaded favourites from storage:', storedFavourites);
      if (storedFavourites) {
        const parsedFavourites = JSON.parse(storedFavourites);
        console.log('Parsed favourites:', parsedFavourites);
        setFavourites(parsedFavourites);
      }
    } catch (error) {
      console.error('Error loading favourites:', error);
    }
  };

  useEffect(() => {
    loadFavourites();
  }, []);

  const refreshFavourites = async () => {
    await loadFavourites();
  };

  const toggleFavourite = async (product) => {
    try {
      console.log('Toggling favourite for product:', product);
      const isFavourite = favourites.some(item => item.id === product.id);
      let newFavourites;
      
      if (isFavourite) {
        newFavourites = favourites.filter(item => item.id !== product.id);
      } else {
        // Ensure we're only storing necessary data
        const simplifiedProduct = {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          images: product.images
        };
        newFavourites = [...favourites, simplifiedProduct];
      }
      
      console.log('Saving new favourites array:', newFavourites);
      await AsyncStorage.setItem('favourites', JSON.stringify(newFavourites));
      setFavourites(newFavourites);
    } catch (error) {
      console.error('Error toggling favourite:', error);
    }
  };

  const isFavourite = (productId) => {
    return favourites.some(item => item.id === productId);
  };

  return (
    <FavouritesContext.Provider value={{ 
      favourites, 
      toggleFavourite, 
      isFavourite,
      refreshFavourites 
    }}>
      {children}
    </FavouritesContext.Provider>
  );
}; 