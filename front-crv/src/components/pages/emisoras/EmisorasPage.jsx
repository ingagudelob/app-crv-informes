import axios from "axios";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBroadcastTower } from "@fortawesome/free-solid-svg-icons";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import ButtonB from "react-bootstrap/Button";
import "../cssPage/cssPages.css";
import Form from "react-bootstrap/Form";
import Footer from "../../../footers/Footer";
import FooterPage from "../../../footers/FooterPage";
import { useQuery } from "react-query";

const URLBasic = "http://localhost:9000/apiscrv/emisoras/";

const EmisorasPage = () => {
  // ---------------------- Creacion de variables de estados ----------------------

  const [dataEmisora, setDataEmisora] = useState([]);
  const [addData, setAddData] = useState([]);
  const [tablaBuscar, setTablaBuscar] = useState([]);
  const [search, setSearch] = useState("");
  const [menuVisible, setmenuVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [editarVisible, setEditarVisible] = useState(false);
  const [insertEmisora, setInsertEmisora] = useState([]);

  /** Peticion de lectura de emisoras */

  const getAllUser = async () => {
    /**
     * 
     await axios.get(URLBasic + "listEmisoras").then((response) => {
       setDataEmisora(response.data);
       setTablaBuscar(response.data);
      });
       const {data} = await axios.get(URLBasic + "listEmisoras");
       setDataEmisora(data);
       setTablaBuscar(data);
     
     */
    try {
      await axios.get(URLBasic + "listEmisoras").then((response) => {
        setDataEmisora(response.data);
        setTablaBuscar(response.data);
      });
    } catch (err) {
      console.error("err");
    }
  };

  // Creamos la petición post
  const addEmisora = async () => {
    await axios
      .post(URLBasic + "addEmisora", insertEmisora)
      .then((response) => {
        setAddData(addData.concat(response.data));
      });
    setmenuVisible(false);
    setEditarVisible(false);
    getAllUser();
  };

  // Creamos la peticion Delete
  const deleteUser = async () => {
    await axios
      .get(URLBasic + "deleteEmisora/" + insertEmisora.id)
      .then((res) => {
        setDataEmisora(
          dataEmisora.filter((user) => user.id !== insertEmisora.id)
        );
      });
    handleDialogEliminar();
    setInsertEmisora([]);
    getAllUser();
  };

  // Metodo para buscar una emisora

  const handleSearch = (e) => {
    setSearch(e.target.value);
    searchFilter(e.target.value);
  };

  const searchFilter = (emisoraBuscada) => {
    // eslint-disable-next-line array-callback-return
    let resBusqueda = tablaBuscar.filter((emisora) => {
      if (
        emisora.nombreEmisora
          .toString()
          .toLowerCase()
          .includes(emisoraBuscada.toLowerCase())
      )
        return emisora;
    });
    setDataEmisora(resBusqueda);
  };

  const selectUser = (emisora, accion) => {
    setInsertEmisora(emisora);
    if (accion === "Editar") {
      setEditarVisible(true);
    } else {
      handleDialogEliminar();
    }
  };

  const renderFooter = (name) => {
    return (
      <div>
        <div className="text-center mt-2">
          <b>© 2022 Copyright</b> | APP Informes CRV
        </div>
      </div>
    );
  };

  const capturaInput = (e) => {
    const { id, value } = e.target;
    setInsertEmisora((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleDialogVisible = () => {
    setmenuVisible(true);
    setInsertEmisora([]);
  };

  const handleDialogEliminar = () => {
    setDeleteVisible(!deleteVisible);
  };

  // --------------------- React Query ---------------------------

  const { isFetching } = useQuery(["emisoras"], getAllUser, {
    refetchInterval: 48000,
    refetchOnWindowFocus: false
  });

  /** 
   useEffect(() => {
     getAllUser();
  }, []);
     * 
    */

  return (
    <>
      <div className="container " style={{}}>
        <h1>Registro de nuevas emisoras</h1>
        <hr />
        <div className="container">
          <button
            onClick={() => {
              handleDialogVisible();
            }}
            type="button"
            className="btn btn-primary"
          >
            <FontAwesomeIcon
              className=""
              icon={faBroadcastTower}
              style={{ fontSize: "25px", margin: "5px" }}
            />
            <b
              style={{
                display: "flex",
                alignContent: "center",
                textAlign: "center",
              }}
            >
              Nueva Emisora
            </b>
          </button>
          <div className="buscador">
            <InputText
              value={search}
              placeholder="Buscar..."
              onChange={handleSearch}
            />
          </div>
        </div>
        <br />

        <Table
          responsive
          striped
          bordered
          hover
          variant="primary"
          size="sm"
          className="container"
        >
          <thead className="text-center text-bold">
            <tr>
              <td>Codigo</td>
              <td>Nombre</td>
              <td>Frecuencia</td>
              <td>Tipo</td>
              <td>Potencia</td>
              <td>Ciudad</td>
              <td>Tx Pricipal</td>
              <td>Tx Auxiliar</td>
              <td>Planta Electrica</td>
              <td>Estudios</td>
              <td>Acción</td>
            </tr>
          </thead>
          <tbody>
            {!dataEmisora?.length && (
              <tr>
                <td colSpan="11"> No existen resultados</td>
              </tr>
            )}
            {dataEmisora.map((emisora) => (
              <tr key={emisora.id}>
                <td>{emisora.id}</td>
                <td>{emisora.nombreEmisora}</td>
                <td>{emisora.frecuenciaEmisora}</td>
                <td>{emisora.tipoEmisora}</td>
                <td>{emisora.potenciaEmisora}</td>
                <td>{emisora.ciudadEmisora}</td>
                <td>{emisora.txPrincipal}</td>
                <td>{emisora.txAuxiliar}</td>
                <td>{emisora.plantaElectrica}</td>
                <td>{emisora.estudios ? "Si" : "No"}</td>

                <td
                  style={{ minWidth: "100px" }}
                  width="10%"
                  className="text-center"
                >
                  <ButtonB
                    className=" mb-1 mt-1"
                    variant="warning"
                    onClick={() => selectUser(emisora, "Editar")}
                  >
                    <i className="pi pi-pencil" width="20%"></i>
                  </ButtonB>{" "}
                  <ButtonB
                    className=" mb-1 mt-1"
                    variant="danger"
                    onClick={() => selectUser(emisora, "Eliminar")}
                  >
                    <i className="pi pi-trash" width="20%"></i>
                  </ButtonB>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/** ------------------ Ventana para agregar emisora nueva ---------------*/}
      <div>
        <Dialog
          header={
            <FontAwesomeIcon
              fontSize="55px"
              style={{ margin: "10px 5px 0px 44%", fontSize: "60px" }}
              title="Iglesias"
              icon={faBroadcastTower}
            />
          }
          visible={menuVisible}
          style={{ width: "400px", fontSize: "12px" }}
          modal={true}
          onHide={() => setmenuVisible(false)}
          footer={<Footer accion="Nueva Emisora" />}
        >
          <div>
            {/*<span className="p-float-label mt-2">
                <InputText className="container" id="id" onChange={capturaInput} />
                <label htmlFor="id">Id</label>
                </span>*/}

            <span className="p-float-label mt-2">
              <InputText
                required
                placeholder="Código"
                className="container"
                id="id"
                onChange={capturaInput}
              />
            </span>

            <span className="p-float-label mt-3">
              <InputText
                required
                placeholder="Nombre"
                className="container"
                id="nombreEmisora"
                onChange={capturaInput}
              />
            </span>

            <span className="p-float-label mt-3">
              <InputText
                required
                placeholder="Frecuencia"
                className="container"
                id="frecuenciaEmisora"
                onChange={capturaInput}
              />
            </span>

            <span className="p-float-label mt-3">
              <InputText
                required
                placeholder="Tipo (FM - AM)"
                className="container"
                id="tipoEmisora"
                onChange={capturaInput}
              />
            </span>

            <span className="p-float-label mt-3">
              <InputText
                required
                placeholder="Potencia"
                className="container"
                id="potenciaEmisora"
                onChange={capturaInput}
              />
            </span>

            <span className="p-float-label mt-3">
              <InputText
                required
                placeholder="Ciudad"
                className="container"
                id="ciudadEmisora"
                onChange={capturaInput}
              />
            </span>

            <span className="p-float-label mt-3">
              <InputText
                required
                placeholder="Tx principal"
                className="container"
                id="txPrincipal"
                onChange={capturaInput}
              />
            </span>

            <span className="p-float-label mt-3">
              <InputText
                required
                placeholder="Tx Auxiliar"
                className="container"
                id="txAuxiliar"
                onChange={capturaInput}
              />
            </span>

            <span className="p-float-label mt-3">
              <InputText
                required
                placeholder="Planta Electrica"
                className="container"
                id="plantaElectrica"
                onChange={capturaInput}
              />
            </span>

            {/*
              <div className="p-field-checkbox mt-2">
                <Checkbox
                  inputId="binary"
                  checked={onCheck}
                  onChange={(e) => {
                    setInChecked("admin");
                    setOnCheck(!onCheck);
                    capturaInput();
                  }}
                  id="role"
                  value={inChecked}
                />
                <label style={{ paddingLeft: "10px" }} htmlFor="binary">
                  Admin
                </label>
              </div>*/}

            <div className="mt-2">
              <div style={{ paddingTop: "10px" }}>
                <Form>
                  <p className="mx-1">Estudios: </p>
                  <div className="mx-1">
                    <Form.Check
                      inline
                      label="Si"
                      name="estudioAdd"
                      type="radio"
                      id="estudios"
                      value="true"
                      onChange={(evento) => {
                        const { id, value } = evento.target;
                        setInsertEmisora((prevState) => ({
                          ...prevState,
                          [id]: value,
                        }));
                      }}
                    />
                    <Form.Check
                      inline
                      label="No"
                      name="estudioAdd"
                      type="radio"
                      id="estudios"
                      value="false"
                      onChange={(evento) => {
                        const { id, value } = evento.target;
                        setInsertEmisora((prevState) => ({
                          ...prevState,
                          [id]: value,
                        }));
                      }}
                    />
                  </div>
                </Form>
              </div>
            </div>
          </div>

          <div className="">
            <div className="row">
              <div className="col text-center">
                <Button
                  label="Agregar"
                  icon="pi pi-check"
                  onClick={() => addEmisora()}
                  className="p-button-success mt-2 "
                />
              </div>
            </div>
          </div>
        </Dialog>
      </div>

      {/* ------------------ Ventana para editar un prodcuto ---------------*/}

      <Dialog
        header={
          <FontAwesomeIcon
            fontSize="55px"
            style={{ margin: "10px 5px 0px 44%", fontSize: "60px" }}
            title="Iglesias"
            icon={faBroadcastTower}
          />
        }
        visible={editarVisible}
        style={{ width: "400px", fontSize: "12px" }}
        modal={true}
        onHide={() => setEditarVisible(false)}
        footer={<Footer accion="Editar Emisora" />}
      >
        <div>
          {/*<span className="p-float-label mt-2">
              <InputText
                className="container"
                id="id"
                disabled
                value={insertEmisora && insertEmisora.id}
                onChange={capturaInput}
              />
              <label htmlFor="id">Id</label>
      </span>*/}

          <span className="p-float-label mt-4">
            <InputText
              disabled
              className="container"
              id="id"
              value={insertEmisora.id}
              onChange={capturaInput}
            />
            <label htmlFor="user">Identificación</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="nombreEmisora"
              value={insertEmisora && insertEmisora.nombreEmisora}
              onChange={(e) => {
                const { id, value } = e.target;
                setInsertEmisora((prevState) => ({
                  ...prevState,
                  [id]: value,
                }));
              }}
            />
            <label htmlFor="user">Nombre</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="frecuenciaEmisora"
              value={insertEmisora && insertEmisora.frecuenciaEmisora}
              onChange={capturaInput}
            />
            <label htmlFor="user">Frecuencia</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="tipoEmisora"
              value={insertEmisora && insertEmisora.tipoEmisora}
              onChange={capturaInput}
            />
            <label htmlFor="user">Tipo (AM - FM)</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="potenciaEmisora"
              value={insertEmisora && insertEmisora.potenciaEmisora}
              onChange={capturaInput}
            />
            <label htmlFor="user">Potencia</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="ciudadEmisora"
              value={insertEmisora && insertEmisora.ciudadEmisora}
              onChange={capturaInput}
            />
            <label htmlFor="user">Ciudad</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="txPrincipal"
              value={insertEmisora && insertEmisora.txPrincipal}
              onChange={capturaInput}
            />
            <label htmlFor="user">Tx Principal</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="txAuxiliar"
              value={insertEmisora && insertEmisora.txAuxiliar}
              onChange={capturaInput}
            />
            <label htmlFor="user">Tx Auxiliar</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="plantaElectrica"
              value={insertEmisora && insertEmisora.plantaElectrica}
              onChange={capturaInput}
            />
            <label htmlFor="user">Planta Electrica</label>
          </span>

          <div style={{ paddingTop: "10px" }}>
            <Form>
              <p className="mx-1">Estudios: </p>
              <div className="mx-1">
                <Form.Check
                  inline
                  label="Si"
                  name="group1"
                  type="radio"
                  id="estudios"
                  value="true"
                  onChange={(evento) => {
                    const { id, value } = evento.target;
                    setInsertEmisora((prevState) => ({
                      ...prevState,
                      [id]: value,
                    }));
                  }}
                />
                <Form.Check
                  inline
                  label="No"
                  name="group1"
                  type="radio"
                  id="estudios"
                  value="false"
                  onChange={(evento) => {
                    const { id, value } = evento.target;
                    setInsertEmisora((prevState) => ({
                      ...prevState,
                      [id]: value,
                    }));
                  }}
                />
              </div>
            </Form>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col text-center">
              <Button
                label="Aceptar"
                icon="pi pi-check"
                onClick={() => addEmisora()}
                className="p-button-success mt-2 "
              />
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog
        className="text-center"
        header=""
        visible={deleteVisible}
        style={{ width: "400px", fontSize: "12px" }}
        modal={true}
        onHide={() => setDeleteVisible(false)}
        footer={renderFooter("displayBasic")}
      >
        <h5>
          ¿Deseas eliminar esta emisora:{" "}
          <b>{insertEmisora && insertEmisora.nombreEmisora}</b>?
        </h5>
        <div align="right">
          <ButtonB
            className="mx-2"
            variant="danger"
            onClick={() => {
              deleteUser();
            }}
          >
            Aceptar
          </ButtonB>
        </div>
      </Dialog>

      {/**--------------------------- FooterPage -------------------------- */}
      <FooterPage className="footer-component" />

      {isFetching && (
        <div id="container_loading">
          <div id="loading"></div>
        </div>
      )}
    </>
  );
};

export default EmisorasPage;
