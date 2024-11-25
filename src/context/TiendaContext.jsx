import { createContext } from "react";
import clienteAxios from "../config/axios";

const TiendaContext = createContext();

const TiendaProvider = ({children}) => {

      // valores a entregar a vistas:
      //const [categorias, setCategorias] = useState([])


      //EJEMPLO DE FUNCION
      // const obtenerCategorias = async () => {
      //   const token = localStorage.getItem('AUTH_TOKEN')
      //   try {
      //     const {data} = await clienteAxios('/api/categorias',{
      //       headers: {
      //         Authorization: `Bearer ${token}`
      //       }
      //     })
      //     setCategorias(data.data)
      //     setCategoriaActual(data.data[0])
      //   } catch (e) {
      //     console.log(e)
      //   }
      // }
    
      // useEffect(() => {
      //   obtenerCategorias()
      // }, [])

  return (
    <TiendaContext.Provider value={{
      //EJEMPLO DE VALOR ENVIADO POR PROVIDER
      //categorias
    }}>
      {children}
    </TiendaContext.Provider>
  )
}

export {
  TiendaProvider
}

export default TiendaContext;