// Para poder suscribirme al contexto debo importar el hook de react, useContext

import { useEffect } from "react";
import { useContext } from "react";
import EmisorasContext from "../../../contexts/emisoraContext/EmisoraContext";
import ListEmisoras from "./ListEmisoras";

const InformesPage = ({ url, name }) => {
  //const myContextBroadcast = useContext(EmisorasContext);

  const { getAllEmisoras, emisora } = useContext(EmisorasContext);

  useEffect(() => {
    getAllEmisoras().catch(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <h1>Listado de informe</h1>
      <ListEmisoras emisoras={emisora} />
    </div>
  );
};
export default InformesPage;
