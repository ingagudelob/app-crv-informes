import axios from "axios";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import ButtonB from "react-bootstrap/Button";
import "../cssPage/cssPages.css";
import Form from "react-bootstrap/Form";
import Footer from "../../../footers/Footer";
import FooterPage from "../../../footers/FooterPage";
import { useQuery } from "react-query";

const URLBasic = "http://localhost:9000/apiscrv/user/";

const UserPage = () => {
  const [dataUser, setDataUser] = useState([]);
  const [addData, setAddData] = useState([]);
  const [tablaBuscar, setTablaBuscar] = useState([]);
  const [search, setSearch] = useState("");
  const [menuVisible, setmenuVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [editarVisible, setEditarVisible] = useState(false);
  const [insertSuplier, setInsertSuplier] = useState([]);

  /** Peticion de lectura de usuarios */

  const getAllUser = async () => {
    await axios.get(URLBasic + "listUser").then((response) => {
      setDataUser(response.data);
      setTablaBuscar(response.data);
    });
  };

  // Creamos la petición post
  const addUser = async () => {
    await axios.post(URLBasic + "addUser", insertSuplier).then((response) => {
      setAddData(addData.concat(response.data));
    });
    setmenuVisible(false);
    setEditarVisible(false);
    getAllUser();
  };

  // Creamos la peticion Delete
  const deleteUser = async () => {
    await axios.get(URLBasic + "deleteUser/" + insertSuplier.id).then((res) => {
      setDataUser(dataUser.filter((user) => user.id !== insertSuplier.id));
    });
    handleDialogEliminar();
    setInsertSuplier([]);
    getAllUser();
  };

  const selectUser = (user, accion) => {
    setInsertSuplier(user);
    if (accion === "Editar") {
      setEditarVisible(true);
    } else {
      setInsertSuplier(user);
      handleDialogEliminar();
    }
  };

  // Metodo para buscar

  const handleSearch = (e) => {
    setSearch(e.target.value);
    searchFilter(e.target.value);
  };

  const searchFilter = (usuarioBuscado) => {
    var resBusqueda = tablaBuscar.filter((usuario, ) => {
      
      if (
        usuario.userName
          .toString()
          .toLowerCase()
          .includes(usuarioBuscado.toLowerCase())
      ) return usuario;

    });
    setDataUser(resBusqueda);
  };

  /**
   * 
  const renderFooter = (name) => {
    return (
      <div>
        <div className="text-center mt-2">
          <b>© 2022 Copyright</b> | APP Informes CRV
        </div>
      </div>
    );
  };
     */

  const capturaInput = (e) => {
    const { id, value } = e.target;
    setInsertSuplier((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleDialogVisible = () => {
    setmenuVisible(true);
    setInsertSuplier([]);
  };

  const handleDialogEliminar = () => {
    setDeleteVisible(!deleteVisible);
  };

  const { isFetching } = useQuery(["user"], getAllUser, {
    refetchInterval: 48000,
    refetchOnWindowFocus: false
  });

  //useEffect(() => {
  //  getAllUser();
  //}, []);

  return (
    <>
      <div className="container">
        <h1>Registro de nuevos técnicos</h1>
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
              icon={faUserPlus}
              style={{ fontSize: "25px", margin: "5px" }}
            />
            <b
              style={{
                display: "flex",
                alignContent: "center",
                textAlign: "center",
              }}
            >
              Nuevo Usuario
            </b>
          </button>
          <div className="buscador">
            <InputText
              id="searchUser"
              value={search}
              placeholder="Buscar.."
              onChange={handleSearch}
            />
          </div>
          {/*<Search urlSolicitud="http://localhost:9000/apiscrv/user/listUser" />*/}
        </div>

        <br />

        {/** -- Script para recorrer las listas y mostrar la tabla de Usuarios ---*/}
        <div>
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
                <td>Id</td>
                <td>Nombre</td>
                <td>Teléfono</td>
                <td>Usuario</td>
                <td>Contraseña</td>
                <td>Sede</td>
                <td>Rol</td>
                <td>Acción</td>
              </tr>
            </thead>
            <tbody>
              {!dataUser?.length && <tr><td colSpan="8"> No existen resultados</td></tr>}
              {dataUser.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.userName}</td>
                  <td>{usuario.userTelephone}</td>
                  <td>{usuario.user}</td>
                  <td>{usuario.pass}</td>
                  <td>{usuario.sede}</td>
                  <td>{usuario.role}</td>

                  <td
                    style={{ minWidth: "100px" }}
                    width="10%"
                    className="text-center"
                  >
                    <ButtonB
                      className=" mb-1 mt-1"
                      variant="warning"
                      onClick={() => selectUser(usuario, "Editar")}
                    >
                      <i className="pi pi-pencil" width="20%"></i>
                    </ButtonB>{" "}
                    <ButtonB
                      className=" mb-1 mt-1"
                      variant="danger"
                      onClick={() => selectUser(usuario, "Eliminar")}
                    >
                      <i className="pi pi-trash" width="20%"></i>
                    </ButtonB>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/** ------------------ Ventana para agregar un Usuario nuevo ---------------*/}
      <div>
        <Dialog
          header={
            <FontAwesomeIcon
              fontSize="55px"
              style={{ margin: "10px 5px 0px 44%", fontSize: "60px" }}
              title="Iglesias"
              icon={faUserPlus}
            />
          }
          visible={menuVisible}
          style={{ width: "400px", fontSize: "12px" }}
          modal={true}
          onHide={() => setmenuVisible(false)}
          footer={<Footer accion="Agregar Usuario" />}
        >
          <div>
            {/*<span className="p-float-label mt-2">
              <InputText className="container" id="id" onChange={capturaInput} />
              <label htmlFor="id">Id</label>
              </span>*/}

            <span className="p-float-label mt-2">
              <InputText
                required
                placeholder="Identificación"
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
                id="userName"
                onChange={capturaInput}
              />
            </span>

            <span className="p-float-label mt-3">
              <InputText
                required
                placeholder="Teléfono"
                className="container"
                id="userTelephone"
                onChange={capturaInput}
              />
            </span>

            <span className="p-float-label mt-3">
              <InputText
                required
                placeholder='Usuario - "ejemplo@midominio.com"'
                type="email"
                className="container"
                id="user"
                onChange={capturaInput}
              />
            </span>

            <span className="p-float-label mt-3">
              <InputText
                required
                placeholder="Contraseña"
                type="password"
                className="container"
                id="pass"
                onChange={capturaInput}
              />
            </span>

            <span className="p-float-label mt-3">
              <InputText
                required
                placeholder="Ciudad"
                className="container"
                id="sede"
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
                  <p className="mx-1">Administrador: </p>
                  <div className="mx-1">
                    <Form.Check
                      inline
                      label="Si"
                      name="adminAdd"
                      type="radio"
                      id="estudios"
                      value="admin"
                      onChange={(evento) => {
                        const { id, value } = evento.target;
                        setInsertSuplier((prevState) => ({
                          ...prevState,
                          [id]: value,
                        }));
                      }}
                    />
                    <Form.Check
                      inline
                      label="No"
                      name="adminAdd"
                      type="radio"
                      id="estudios"
                      value="tecnico"
                      onChange={(evento) => {
                        const { id, value } = evento.target;
                        setInsertSuplier((prevState) => ({
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
                  onClick={() => addUser()}
                  className="p-button-success mt-2 "
                />
              </div>
            </div>
          </div>
        </Dialog>
      </div>

      {/* ------------------ Ventana para editar un Usuario existente ---------------*/}

      <Dialog
        header={
          <FontAwesomeIcon
            fontSize="55px"
            style={{ margin: "10px 5px 0px 44%", fontSize: "60px" }}
            title="Iglesias"
            icon={faUserEdit}
          />
        }
        visible={editarVisible}
        style={{ width: "400px", fontSize: "12px" }}
        modal={true}
        onHide={() => setEditarVisible(false)}
        footer={<Footer accion="Editar Usuario" />}
      >
        <div>
          <span className="p-float-label mt-4">
            <InputText
              disabled
              className="container"
              id="id"
              value={insertSuplier && insertSuplier.id}
              onChange={capturaInput}
            />
            <label htmlFor="user">Identificación</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="userName"
              value={insertSuplier && insertSuplier.userName}
              onChange={capturaInput}
            />
            <label htmlFor="user">Nombre</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="userTelephone"
              value={insertSuplier && insertSuplier.userTelephone}
              onChange={capturaInput}
            />
            <label htmlFor="user">Teléfono o Celular</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="user"
              value={insertSuplier && insertSuplier.user}
              onChange={capturaInput}
            />
            <label htmlFor="user">Usuario (E-mail)</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="pass"
              value={insertSuplier && insertSuplier.pass}
              onChange={capturaInput}
            />
            <label htmlFor="user">Contraseña</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="sede"
              value={insertSuplier && insertSuplier.sede}
              onChange={capturaInput}
            />
            <label htmlFor="user">Ciudad</label>
          </span>

          <div style={{ paddingTop: "10px" }}>
            <Form>
              <p className="mx-1">Administrador: </p>
              <div className="mx-1">
                <Form.Check
                  inline
                  label="Si"
                  name="adminEdit"
                  type="radio"
                  id="role"
                  value="admin"
                  onChange={(evento) => {
                    const { id, value } = evento.target;
                    setInsertSuplier((prevState) => ({
                      ...prevState,
                      [id]: value,
                    }));
                  }}
                />
                <Form.Check
                  inline
                  label="No"
                  name="adminEdit"
                  type="radio"
                  id="role"
                  value="tecnico"
                  onChange={(evento) => {
                    const { id, value } = evento.target;
                    setInsertSuplier((prevState) => ({
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
                onClick={() => addUser()}
                className="p-button-success mt-2 "
              />
            </div>
          </div>
        </div>
      </Dialog>

      {/* ------------------ Ventana para confirmar al eliminar un Usuario ---------------*/}

      <Dialog
        className="text-center"
        header=""
        visible={deleteVisible}
        style={{ width: "400px", fontSize: "12px" }}
        modal={true}
        onHide={() => setDeleteVisible(false)}
        footer={<Footer accion="Eliminar Usuario" />}
      >
        <h5>
          ¿Deseas eliminar este usuario{" "}
          <b>{insertSuplier && insertSuplier.userName}</b>?
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
      <FooterPage className="footer-component"/>

      {isFetching && (
        <div id="container_loading">
          <div id="loading"></div>
        </div>
      )}
    </>
  );
};

export default UserPage;
