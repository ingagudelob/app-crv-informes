import axios from "axios";
import { InputText } from "primereact/inputtext";
import React from "react";
import { useEffect, useState } from "react";

export const Search = ({ urlSolicitud, name }) => {
  const [buscar, setBuscar] = React.useState("");
  const [data, setData] = useState([]);
  const [dataBusqueda, setDataBusqueda] = React.useState([]);

  const urlLlega = urlSolicitud;

  const leerApi = async () => {
    await axios.get(urlLlega).then((respuesta) => {
      setData(respuesta.data);
      setDataBusqueda(respuesta.data);
      console.log(respuesta.data);
    });
  };

  const handleSearch = (e) => {
    //e.preventDefauld();
    setBuscar(e.target.value);
    filtroBuscar(e.target.value);
  };

  const filtroBuscar = (buscando) => {
    var resultadoBusqueda = dataBusqueda.filter((aBuscar) => {
      if (
        aBuscar.userName
          .toString()
          .toLowerCase()
          .includes(buscando.toLowerCase())
      ) {
        return aBuscar;
      }
    });
    setData(resultadoBusqueda);
    console.log(data);
  };

  useEffect(() => {
    leerApi();
  });

  return (
    <div>
      <InputText value={buscar} placeholder="Buscar" onChange={handleSearch} />
    </div>
  );
};
