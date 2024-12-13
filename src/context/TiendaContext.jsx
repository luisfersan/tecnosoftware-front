import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";

const TiendaContext = createContext();

const TiendaProvider = ({ children }) => {

  const [category, setCategory] = useState([])
  const [actualCategory, setactuAlCategory] = useState({})
  const [product, setProduct] = useState([])
  const [order, setOrder] = useState([])
  const [total, setTotal] = useState(0)
  const [profile, setProfile] = useState({})
  const [user, setUser] = useState(null)
  const [purchasedProducts, setPurchasedProducts] = useState([])
  const [showEditModal, setShowEditModal] = useState(false)
  const [showEvaluateModal, setShowEvaluateModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [editedUser, setEditedUser] = useState({
    username: user?.username || '',
    email: user?.email || '',
    password: ''
  })
  const [rating, setRating] = useState('')
  const [comment, setComment] = useState('')


  const MAX_ITEMS = 9;
  const MIN_ITEMS = 1;

  const getCategories = async () => {
    const token = localStorage.getItem('AUTH_TOKEN')
    const { data } = await clienteAxios.get('/categories', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setCategory(data)
  }


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

  // Funciones para manejar el estado del usuario
  const handleSetUser = (newUser) => {
    setUser(newUser)
  }

  const handleSetProfile = () => {
    const getProfile = async () => {
      const token = localStorage.getItem('AUTH_TOKEN')
      const { data } = await clienteAxios.get('/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setProfile(data)
    }
  }

  const handleSetEditedUser = (newEditedUser) => {
    setEditedUser(newEditedUser)
  }

  const handleSetShowEditModal = (show) => {
    setShowEditModal(show)
  }

  const handleSetShowEvaluateModal = (show) => {
    setShowEvaluateModal(show)
  }

  const handleSetSelectedProduct = (product) => {
    setSelectedProduct(product)
  }

  const handleSetRating = (newRating) => {
    setRating(newRating)
  }

  const handleSetComment = (newComment) => {
    setComment(newComment)
  }

  const handleSetPurchasedProducts = (newProductos) => {
    setPurchasedProducts(newProductos)
  }

  // Función para editar el usuario
  const handleEditUser = () => {
    axiosInstance.put(`/usuarios/${user.id}`, editedUser)
      .then(response => {
        handleSetUser(response.data)  // Actualiza el usuario en el contexto global
        handleSetShowEditModal(false)
      })
      .catch(error => console.error("Error al editar usuario:", error))
  }

  // Función para evaluar un producto
  const handleEvaluateProduct = () => {
    const data = {
      rating,
      comment
    }
    axiosInstance.post(`/productos/${selectedProduct.id}/evaluacion`, data)
      .then(response => {
        handleSetShowEvaluateModal(false)
        handleSetRating('')
        handleSetComment('')
      })
      .catch(error => console.error("Error al evaluar producto:", error))
  }

  return (
    <TiendaContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        user,
        handleSetUser,
        purchasedProducts,
        handleSetPurchasedProducts,
        showEditModal,
        handleSetShowEditModal,
        showEvaluateModal,
        handleSetShowEvaluateModal,
        selectedProduct,
        handleSetSelectedProduct,
        editedUser,
        handleSetEditedUser,
        rating,
        handleSetRating,
        comment,
        handleSetComment,
        handleEditUser,
        handleEvaluateProduct,
        category,
        profile
      }}
    >
      {children}
    </TiendaContext.Provider>
  );
};

export { TiendaProvider };
export default TiendaContext;
