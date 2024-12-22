import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import { jwtDecode } from 'jwt-decode';
import { Navigate } from "react-router-dom";

const TiendaContext = createContext();

const TiendaProvider = ({ children }) => {

  const [categories, setCategories] = useState([])
  const [actualCategory, setactuAlCategory] = useState("destacados")
  const [products, setProducts] = useState([])
  const [profile, setProfile] = useState({})
  const [allProfiles, setAllProfiles] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false)
  const [showEvaluateModal, setShowEvaluateModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const MAX_ITEMS = 9;
  const MIN_ITEMS = 1;


  //FUNCIONES DE PERFIL
  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      return decoded.exp < currentTime;
    } catch (error) {
      return true;
    }
  };

  const getProfile = async () => {
    const token = localStorage.getItem('AUTH_TOKEN');

    if (isTokenExpired(token)) {
      localStorage.removeItem('AUTH_TOKEN');
      setProfile({});
      return; // Salimos para evitar la solicitud
    }

    try {
      const { data } = await clienteAxios.get('/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!data.data.user) {
        localStorage.removeItem('AUTH_TOKEN');
        return;
      }

      setProfile(data.data.user);
    } catch (error) {
      console.error('Error fetching profile:', error);
      if (error.response && error.response.status === 401) {
        // Si el backend confirma que el token es inválido o ha expirado
        localStorage.removeItem('AUTH_TOKEN');
      }
    }
  };

  const updateProfile = async (updatedData) => {
    try {
      const token = localStorage.getItem("AUTH_TOKEN");
      const { data } = await clienteAxios.put(
        "/users/profile",
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfile(data.data.user);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  const handleClickEndSession = () => {
    localStorage.removeItem('AUTH_TOKEN');
    setProfile({});
  }

  const getAllProfiles = async () => {
    try {
      const token = localStorage.getItem("AUTH_TOKEN");
      const { data } = await clienteAxios.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllProfiles(data.data);
    } catch (error) {
      console.error("Error al obtener los perfiles:", error);
    }
  };

  const updateUserById = async (id, userData) => {
    try {
      const token = localStorage.getItem("AUTH_TOKEN");
      const { data } = await clienteAxios.put(`/users/${id}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getAllProfiles();
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  }

  const deleteUserById = async (id) => {
    try {
      const token = localStorage.getItem("AUTH_TOKEN");
      await clienteAxios.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getAllProfiles();
    } catch (error) {
      console.error("Error al eliminar el perfil:", error);
    }
  }
  //FIN FUNCIONES PERFIL


  //FUNCIONES PRODUCTOS
  const getCategories = async () => {
    try {
      const { data } = await clienteAxios.get('/categories');
      const categoriesArray = data.data.map((category) => category.name)
      setCategories(categoriesArray);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  const handleSetActualCategory = async (selectedCategory) => {
    setactuAlCategory(selectedCategory)
    try {
      if (selectedCategory !== "destacados") {
        const { data } = await clienteAxios.get(`/products/category/${selectedCategory}`);
        setProducts(data)
      } else {
        const { data } = await clienteAxios.get('/products/top');
        setProducts(data)
      }
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  }

  const evaluateProduct = async (productId, evaluation) => {
    try {
      const token = localStorage.getItem("AUTH_TOKEN");
      await clienteAxios.post(
        `/products/${productId}/evaluate`,
        evaluation,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowEvaluateModal(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error al evaluar producto:", error);
    }
  };

  const getAllProducts = async () => {
    try {
      const token = localStorage.getItem("AUTH_TOKEN");
      const { data } = await clienteAxios.get("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllProducts(data.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  const updateProductById = async (id, productData) => {
    try {
      const token = localStorage.getItem("AUTH_TOKEN");
      const { data } = await clienteAxios.put(`/products/${id}`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getAllProducts();
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  const deleteProductById = async (id) => {
    try {
      const token = localStorage.getItem("AUTH_TOKEN");
      await clienteAxios.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getAllProducts();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const getPurchasedProducts = async (user_id) => {
    const token = localStorage.getItem('AUTH_TOKEN');
    if (!token) return;

    try {
      const { data } = await clienteAxios.get(`/products/purchased/${user_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPurchasedProducts(data.data);
    } catch (error) {
      console.error('Error al obtener productos comprados:', error.response?.data || error.message);
    }
  };

  const createProduct = async (productData) => {
    try {
      const token = localStorage.getItem('AUTH_TOKEN');
      const { data } = await clienteAxios.post('/products', productData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getAllProducts();
    } catch (error) {
      console.error('Error al crear el producto:', error.response?.data || error.message);
    }
  };

  //FIN FUNCIONES PRODUCTOS


  //FUNCIONES CARRITO

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [cart, setCart] = useState(initialCart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    const itemExists = cart.findIndex((product) => product.product_id === item.product_id);
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
    setCart(prevCart => prevCart.filter(item => item.product_id !== id));
  };

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.product_id === id && item.quantity < MAX_ITEMS) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.product_id === id && item.quantity > MIN_ITEMS) {
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

  // const handleClickPagar = () => {
  //   const token = localStorage.getItem("AUTH_TOKEN");
  //   if( !token || isTokenExpired( token ) ) {
  //     localStorage.removeItem("AUTH_TOKEN");
  //     Navigate("/login");
  //   } else {
  //     clienteAxios.post("/orders", cart, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       }
  //     }).then((response) => {
  //       setCart([]);
  //       getPurchasedProducts();
  //       navigate("/purchased");
  //     })
  //   }
  // }

  //FIN FUNCIONES CARRITO


  //MODALES
  const handleSetShowEditModal = (show) => {
    setShowEditModal(show)
  }

  const handleSetShowEvaluateModal = (show) => {
    setShowEvaluateModal(show)
  }

  const handleSetSelectedProduct = (product) => {
    setSelectedProduct(product)
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
        showEditModal,
        handleSetShowEditModal,
        showEvaluateModal,
        handleSetShowEvaluateModal,
        selectedProduct,
        handleSetSelectedProduct,
        categories,
        profile,
        actualCategory,
        handleSetActualCategory,
        getCategories,
        getProfile,
        products,
        getPurchasedProducts,
        purchasedProducts,
        evaluateProduct,
        updateProfile,
        handleClickEndSession,
        getAllProducts,
        allProducts,
        getAllProfiles,
        allProfiles,
        updateUserById,
        deleteUserById,
        updateProductById,
        deleteProductById,
        createProduct
      }}
    >
      {children}
    </TiendaContext.Provider>
  );
};

export { TiendaProvider };
export default TiendaContext;
