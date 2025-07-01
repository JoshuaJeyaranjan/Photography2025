import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      return [];
    }
  });

  // Whenever the cart state changes, save it back to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) =>
          cartItem.id === item.id && cartItem.print_size_id === item.print_size_id
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += item.quantity;
        return updatedCart;
      } else {
        return [...prevCart, { ...item, quantity: item.quantity || 1 }];
      }
    });
  };

  const removeFromCart = (itemId, printSizeId) => {
    setCart(prevCart => prevCart.filter(item =>
      !(item.id === itemId && item.print_size_id === printSizeId)
    ));
  };

  const changeItemQuantity = (itemId, printSizeId, delta) => {
    setCart(prevCart => prevCart.map(item =>
      item.id === itemId && item.print_size_id === printSizeId
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  };
  console.log("CartProvider render, current cart:", cart);

  const clearCart = () => {
    setCart([]);
  };

  // Calculate the total number of items in the cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Expose the new functions in the context value
  const value = { cart, addToCart, removeFromCart, changeItemQuantity, clearCart, cartItemCount };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
