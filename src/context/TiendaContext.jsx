import { createContext, useState, useEffect } from "react";

const TiendaContext = createContext();

const TiendaProvider = ({ children }) => {
  const MAX_ITEMS = 9;
  const MIN_ITEMS = 1;


  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [cart, setCart] = useState(initialCart);


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);


  const addToCart = (item) => {
    const itemExists = cart.findIndex((product) => product.id === item.id);
    if (itemExists >= 0) {
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++;
      setCart(updatedCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  // Limpiar el carrito
  const clearCart = () => {
    setCart([]);
  };

  return (
    <TiendaContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart
      }}
    >
      {children}
    </TiendaContext.Provider>
  );
};

export { TiendaProvider };
export default TiendaContext;
