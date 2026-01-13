import { createContext, useContext, useState } from "react";
import API from "../Api.jsx";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartList, setCartList] = useState([]);
  const [cartWithBookingList, setCartWithBookingList] = useState([]);

  const fetchCartList = async () => {
    try {
      const res = await API.get("/api/cart/list");
      setCartList(res.data.carts || []);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Couldn't fetch carts");
    }
  };

  const fetchCartWithBookingList = async () => {
    try {
      const res = await API.get("/api/cart/listWithBooking");
      setCartWithBookingList(res.data.carts || []);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Couldn't fetch carts with booking");
    }
  };

  const createCart = async (cart) => {
    try {
      await API.post("/api/cart", cart);
      fetchCartList();
      fetchCartWithBookingList();
    } catch (err) {
      console.error(err);
      alert("Failed to create cart");
    }
  };

  const updateCart = async (cart) => {
    try {
      await API.put(`/api/cart/${cart.CART_ID}`, cart);
      fetchCartList();
      fetchCartWithBookingList();
    } catch (err) {
      console.error(err);
      alert("Failed to update cart");
    }
  };

  const deleteCart = async (id) => {
    try {
      await API.delete(`/api/cart/${id}`);
      setCartList(prev => prev.filter(c => c.CART_ID !== id));
      setCartWithBookingList(prev => prev.filter(c => c.CART_ID !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete cart");
    }
  };

  return (
    <CartContext.Provider value={{
      cartList,
      cartWithBookingList,
      fetchCartList,
      fetchCartWithBookingList,
      createCart,
      updateCart,
      deleteCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
