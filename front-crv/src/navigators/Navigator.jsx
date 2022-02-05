import React from "react";
import "../navigators/Navigator.css";
import { Image, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faListAlt,
  faSearch,
  faChartLine,
  faFileContract,
  faUsers,
  faBroadcastTower,
  faPlaceOfWorship,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import UserContext from "../contexts/users/UserContext";

const Navigator = () => {
  const { userIn, logout } = useContext(UserContext);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" variant="dark" bg="secondary">
        <Navbar.Brand as={NavLink} to="/" className="mx-4">
          <Image src="CRV-300x300.png" alt="Image" width="50" title="Home" />

          <p
            title="Home"
            style={{
              float: "right",
              padding: "8px 0px 0px 5px",
              margin: "0px",
            }}
          >
            <b>APP Crv</b>
          </p>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              title="Informes"
              id="basic-nav-dropdown"
              className="item-menu"
            >
              <NavDropdown.Item as={NavLink} to="/nuevoInforme">
                <FontAwesomeIcon
                  className="icon-menu"
                  style={{ margin: "0px 10px 0px 0px" }}
                  icon={faFileAlt}
                />
                Nuevo
              </NavDropdown.Item>

              <NavDropdown.Item as={NavLink} to="/listarInformes">
                <FontAwesomeIcon
                  className="icon-menu"
                  icon={faListAlt}
                  style={{ margin: "0px 6px 0px 0px" }}
                />
                Listar informes
              </NavDropdown.Item>

              <NavDropdown.Item as={NavLink} to="/productos">
                <FontAwesomeIcon
                  className="icon-menu"
                  icon={faSearch}
                  style={{ margin: "0px 6px 0px 0px" }}
                />
                Buscar
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item as={NavLink} to="/ventas">
                <FontAwesomeIcon
                  className="icon-menu"
                  icon={faChartLine}
                  style={{ margin: "0px 6px 0px 0px" }}
                />
                Dashboard
              </NavDropdown.Item>

              <NavDropdown.Item as={NavLink} to="/rVentas">
                <FontAwesomeIcon
                  className="icon-menu"
                  icon={faFileContract}
                  style={{ margin: "0px 10px 0px 0px" }}
                />
                Reportes
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Nav className="mx-1">
            <Nav.Link as={NavLink} to="/users">
              <FontAwesomeIcon
                fontSize="55px"
                style={{ margin: "0px  10px -5px", fontSize: "25px" }}
                title="Usuarios"
                icon={faUsers}
              />
              Usuarios
            </Nav.Link>
            <Nav.Link as={NavLink} to="/emisoras">
              <FontAwesomeIcon
                fontSize="55px"
                style={{ margin: "0px  10px -5px", fontSize: "22px" }}
                title="Emisoras"
                icon={faBroadcastTower}
              />
              Emisoras
            </Nav.Link>
            <Nav.Link as={NavLink} to="/iglesias">
              <FontAwesomeIcon
                fontSize="55px"
                style={{ margin: "0px  10px -5px", fontSize: "22px" }}
                title="Iglesias"
                icon={faPlaceOfWorship}
              />
              Iglesias
            </Nav.Link>
            <Nav.Link as={NavLink} onClick={logout} to="/">
              Cerrar sesión
            </Nav.Link>
            <Nav.Link>
            {userIn.userName && <p className=" ">{userIn.userName}</p>}
            </Nav.Link>
            <Nav.Link
              style={{ color: "#0acffe", float: "right" }}
              disabled
            ></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <p>{userIn?.userName}</p>
    </>
  );
};

export default Navigator;
