import React, { createContext, useState } from 'react';

export const CartContext = createContext(); //tạo context

export const CartProvider = ({ children }) => { //children là các component con
  const [cartItems, setCartItems] = useState([]);

  // Thêm sản phẩm vào giỏ hàng (truyền id, name, price từ ProductDetails)
  const addToCart = ({ id, name, price, image }) => {
    setCartItems(prev => {
        const exists = prev.find(item => item.id === id);
        if (exists) {
        return prev.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        }
        return [...prev, { id, name, price, image, quantity: 1 }];
    });
};

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  // Thay đổi số lượng sản phẩm
  const updateQuantity = (id, quantity) => {
    setCartItems(items => {
      if (quantity < 1) {
        // Xóa sản phẩm nếu số lượng nhỏ hơn 1
        return items.filter(item => item.id !== id); //tạo ra một mảng mới không có sản phẩm đó
      }
      return items.map(item => //duyệt qua từng sản phẩm
        item.id === id
          ? { ...item, quantity: quantity > 10 ? 10 : quantity }
          : item
      );
    });
  };

  // Xóa toàn bộ giỏ hàng
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};