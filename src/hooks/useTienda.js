import { useContext } from "react";
import TiendaContext from "../context/TiendaContext";

const useTienda = () => {
  return useContext(TiendaContext);
};

export default useTienda;
