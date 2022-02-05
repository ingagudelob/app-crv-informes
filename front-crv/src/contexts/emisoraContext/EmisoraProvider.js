// Este componente va a ser compartido en toda la app q solicite este contexto

import { useState } from "react";
import EmisorasContext from "./EmisoraContext";
import ApiEmisoras from "../../apis/ApiEmisoras";

// En este componente retornamos el contexto con su provider: <EmisorasContext.Provider value={}></EmisorasContext.Provider>
// Al context con elprivider se le pasa el {children}

const EmisoraProvider = ({ children }) => {
  /*
  const [dataEmisoras, setDataEmisoras] = useState([]);

  const UrlEmisoras = "http://localhost:9000/apiscrv/emisoras/listEmisoras";

  const getAllEmisoras = async () => {
    try {
      const { data } = await axios.get(UrlEmisoras);
      setDataEmisoras(data);
    } catch (err) {
      console.error(err);
      setDataEmisoras([]);
    }
  };

  useEffect(() => {
    getAllEmisoras().catch(null);
  }, []);

  */
  const [emisora, setEmisora] = useState([]);
  const [informesDetail, setInformesDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const getAllEmisoras = async () =>{

    

    try {
      setIsLoading(true);
      const emisorasResult = await ApiEmisoras ({
        url: "https://pokeapi.co/api/v2/pokemon?limit=100&offset=200",
        
      }); 
      setEmisora(emisorasResult.results);
    } catch (error) {
      Promise.reject(error);
      setEmisora([]);
    }finally{
      setIsLoading(false);
    }
  };

  const getAllIformesDetail = async (id)=>{
    if(!id) Promise.reject("No existe el id");
    try {
      setIsLoading(true);
      const informesResult = await ApiEmisoras ({url: `https://pokeapi.co/api/v2/pokemon/${id}`}); 
      setInformesDetail(informesResult);
    } catch (error) {
      Promise.reject(error);
      setInformesDetail([]);
      
    }finally{
      setIsLoading(false);
    }
  }

  // Como quiero compartir el metodo y  el resultado los paso en el value del privider

  return (
    <EmisorasContext.Provider value={{getAllEmisoras, emisora, getAllIformesDetail, informesDetail, isLoading}}>
      {children}
    </EmisorasContext.Provider>
  );
};

export default EmisoraProvider;
