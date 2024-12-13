import { useEffect } from "react";
import useSWR from "swr"
import { useNavigate } from "react-router-dom"
import clienteAxios from "../config/axios";
import { useTienda} from "../hooks/useTienda";

export const useAuth = ({ middleware, url }) => {
  const { clienteAxios, handleSetUser, user } = useTienda(); // Integrado con el contexto de la tienda
  const token = localStorage.getItem("AUTH_TOKEN");
  const navigate = useNavigate();

  // Fetch del perfil del usuario
  const { data: fetchedUser, error, mutate } = useSWR(
    "/profile",
    () =>
      clienteAxios
        .get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data)
        .catch((error) => {
          throw Error(error?.response?.data?.errors);
        }),
    { revalidateOnFocus: false } // Evita recargar datos al cambiar de pestaña
  );

  // Actualizar el usuario en el contexto global si existe un perfil válido
  useEffect(() => {
    if (fetchedUser) {
      handleSetUser(fetchedUser);
    }
  }, [fetchedUser, handleSetUser]);

  // Función de registro
  const registro = async (datos, setErrores) => {
    try {
      const { data } = await clienteAxios.post("/usuarios/registro", datos);
      localStorage.setItem("AUTH_TOKEN", data.token);
      setErrores([]);
      await mutate(); // Revalida el perfil del usuario
    } catch (e) {
      setErrores(Object.values(e.response.data.errors));
    }
  };

  // Función de login
  const login = async (datos, setErrores) => {
    try {
      const { data } = await clienteAxios.post("/auth/login", datos);
      localStorage.setItem("AUTH_TOKEN", data.token);
      setErrores([]);
      await mutate(); // Revalida el perfil del usuario
    } catch (e) {
      setErrores(Object.values(e.response.data.errors));
    }
  };

  // Función de logout
  const logout = async () => {
    try {
      await clienteAxios.post("/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("AUTH_TOKEN");
      handleSetUser(null); // Limpia el usuario del estado global
      await mutate(undefined);
    } catch (error) {
      console.error("Error al cerrar sesión:", error.response?.data);
      throw Error(error?.response?.data?.errors);
    }
  };

  // Efecto para manejar la redirección basada en el middleware
  useEffect(() => {
    if (middleware === "guest" && url && user) {
      navigate(url);
    }
    if (middleware === "guest" && user && user.admin) {
      navigate("/admin");
    }
    if (middleware === "admin" && user && !user.admin) {
      navigate("/");
    }
    if (middleware === "auth" && error) {
      navigate("/auth/login");
    }
  }, [user, error, navigate, middleware, url]);

  return {
    login,
    registro,
    logout,
    user,
    error,
  };
};