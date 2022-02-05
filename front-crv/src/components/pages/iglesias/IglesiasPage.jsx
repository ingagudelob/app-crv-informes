import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaceOfWorship } from "@fortawesome/free-solid-svg-icons";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import ButtonB from "react-bootstrap/Button";
import "../cssPage/cssPages.css";
import Footer from "../../../footers/Footer";
import FooterPage from "../../../footers/FooterPage";

const URLBasic = "http://localhost:9000/apiscrv/iglesias/";

const IglesiasPage = () => {
  const [dataIglesia, setDataIglesia] = useState([]);
  const [addData, setAddData] = useState([]);
  const [tablaBuscar, setTablaBuscar] = useState([]);
  const [search, setSearch] = useState("");
  const [menuVisible, setmenuVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [editarVisible, setEditarVisible] = useState(false);
  const [insertIglesia, setInsertIglesia] = useState([]);

  /** Peticion de lectura de Iglesias */

  const getAllUser = async () => {
    await axios.get(URLBasic + "listIglesias").then((response) => {
      setDataIglesia(response.data);
      setTablaBuscar(response.data);
    });
  };

  // Creamos la petición post
  const addIglesia = async () => {
    await axios
      .post(URLBasic + "addIglesia", insertIglesia)
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
      .get(URLBasic + "deleteIglesia/" + insertIglesia.id)
      .then((res) => {
        setDataIglesia(
          dataIglesia.filter((user) => user.id !== insertIglesia.id)
        );
      });
    handleDialogEliminar();
    setInsertIglesia([]);
    getAllUser();
  };

  // Metodo para buscar una Iglesia

  const handleSearch = (e) => {
    setSearch(e.target.value);
    searchFilter(e.target.value);
  };

  const searchFilter = (iglesiaBuscada) => {
    if (tablaBuscar?.length) {
      let resBusqueda = tablaBuscar.filter((iglesia) => {
        if (
          iglesia.nombreIglesia
            .toString()
            .toLowerCase()
            .includes(iglesiaBuscada.toLowerCase())
        )
          return iglesia;
      });
      setDataIglesia(resBusqueda);
    }
  };

  const selectUser = (iglesia, accion) => {
    setInsertIglesia(iglesia);
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
    setInsertIglesia((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleDialogVisible = () => {
    setmenuVisible(true);
    setInsertIglesia([]);
  };

  const handleDialogEliminar = () => {
    setDeleteVisible(!deleteVisible);
  };

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <>
      <div className="container">
        <h1>Registro de nuevas Sedes</h1>
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
              icon={faPlaceOfWorship}
              style={{ fontSize: "25px", margin: "5px" }}
            />
            <b
              style={{
                display: "flex",
                alignContent: "center",
                textAlign: "center",
              }}
            >
              Nueva Iglesia
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
              <td style={{ minWidth: "150px" }}>Nombre de sede</td>
              <td>Pastor de sede</td>
              <td>Ciudad</td>
              <td>Planta Electrica</td>
              <td>Acción</td>
            </tr>
          </thead>
          <tbody>
            {!dataIglesia?.length && <tr><td colSpan="6"> No existen resultados</td></tr>}
            {dataIglesia?.map((iglesia) => (
              <tr key={iglesia.id}>
                <td>{iglesia.prefID + iglesia.id}</td>
                <td>{iglesia.nombreIglesia}</td>
                <td>{iglesia.pastorIglesia}</td>
                <td>{iglesia.ciudadIglesia}</td>
                <td>{iglesia.plantaElectrica}</td>

                <td
                  style={{ minWidth: "100px" }}
                  width="10%"
                  className="text-center"
                >
                  <ButtonB
                    className="mb-1 mt-1"
                    variant="warning"
                    onClick={() => selectUser(iglesia, "Editar")}
                  >
                    <i className="pi pi-pencil" width="20%"></i>
                  </ButtonB>{" "}
                  <ButtonB
                    className="mb-1 mt-1"
                    variant="danger"
                    onClick={() => selectUser(iglesia, "Eliminar")}
                  >
                    <i className="pi pi-trash" width="20%"></i>
                  </ButtonB>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/** ------------------ Ventana para agregar una sede nueva ---------------*/}
      <div>
        <Dialog
          header={
            <FontAwesomeIcon
              fontSize="55px"
              style={{ margin: "10px 5px 0px 44%", fontSize: "60px" }}
              title="Iglesias"
              icon={faPlaceOfWorship}
            />
          }
          visible={menuVisible}
          style={{ width: "400px", fontSize: "12px" }}
          modal={true}
          onHide={() => setmenuVisible(false)}
          footer={<Footer accion="Nueva Sede" />}
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
                placeholder="Sede"
                className="container"
                id="nombreIglesia"
                onChange={capturaInput}
              />
            </span>

            <span className="p-float-label mt-3">
              <InputText
                required
                placeholder="Pastor de Sede"
                className="container"
                id="pastorIglesia"
                onChange={capturaInput}
              />
            </span>

            <span className="p-float-label mt-3">
              <InputText
                required
                placeholder="Ciudad"
                className="container"
                id="ciudadIglesia"
                onChange={capturaInput}
              />
            </span>

            <span className="p-float-label mt-3">
              <InputText
                required
                placeholder="Plata Electrica"
                className="container"
                id="plantaElectrica"
                onChange={capturaInput}
              />
            </span>
          </div>

          <div className="">
            <div className="row">
              <div className="col text-center">
                <Button
                  label="Agregar"
                  icon="pi pi-check"
                  onClick={() => addIglesia()}
                  className="p-button-success mt-2 "
                />
              </div>
            </div>
          </div>
        </Dialog>
      </div>

      {/* ------------------ Ventana para editar una Sede ---------------*/}

      <Dialog
        header={
          <FontAwesomeIcon
            fontSize="55px"
            style={{ margin: "10px 5px 0px 44%", fontSize: "60px" }}
            title="Iglesias"
            icon={faPlaceOfWorship}
          />
        }
        visible={editarVisible}
        style={{ width: "400px", fontSize: "12px" }}
        modal={true}
        onHide={() => setEditarVisible(false)}
        footer={<Footer accion="Editar Sede" />}
      >
        <div>
          <span className="p-float-label mt-4">
            <InputText
              disabled
              className="container"
              id="id"
              value={insertIglesia.prefID + insertIglesia.id}
              onChange={capturaInput}
            />
            <label htmlFor="user">Identificación</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="nombreIglesia"
              value={insertIglesia && insertIglesia.nombreIglesia}
              onChange={(e) => {
                const { id, value } = e.target;
                setInsertIglesia((prevState) => ({
                  ...prevState,
                  [id]: value,
                }));
              }}
            />
            <label htmlFor="user">Sede</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="pastorIglesia"
              value={insertIglesia && insertIglesia.pastorIglesia}
              onChange={capturaInput}
            />
            <label htmlFor="user">Pastor de sede</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="ciudadIglesia"
              value={insertIglesia && insertIglesia.ciudadIglesia}
              onChange={capturaInput}
            />
            <label htmlFor="user">Ciudad</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="plantaElectrica"
              value={insertIglesia && insertIglesia.plantaElectrica}
              onChange={capturaInput}
            />
            <label htmlFor="user">Planta Electrica</label>
          </span>
        </div>

        <div className="container">
          <div className="row">
            <div className="col text-center">
              <Button
                label="Aceptar"
                icon="pi pi-check"
                onClick={() => addIglesia()}
                className="p-button-success mt-2 "
              />
            </div>
          </div>
        </div>
      </Dialog>

      {/* ------------------ Ventana para confirmar al eliminar una Sede ---------------*/}

      <Dialog
        header="Eliminar Sede"
        visible={deleteVisible}
        style={{ width: "400px", fontSize: "12px" }}
        modal={true}
        onHide={() => handleDialogEliminar(false)}
        footer={renderFooter("displayBasic")}
      >
        <h5>
          ¿Deseas eliminar la sede:{" "}
          <b>{insertIglesia && insertIglesia.nombreIglesia}</b>?
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
    </>
  );
};

export default IglesiasPage;
