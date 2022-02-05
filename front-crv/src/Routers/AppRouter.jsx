import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import EmisorasPage from "../components/pages/emisoras/EmisorasPage";
import HomePage from "../components/pages/home/HomePage";
import IglesiasPage from "../components/pages/iglesias/IglesiasPage";
import DetailEmisoras from "../components/pages/informes/DetailEmisoras";
import NewFormPage from "../components/pages/informes/NewFormPage";
import InformesPage from "../components/pages/informes/InformesPage";
import LoginPage from "../components/pages/logins/LoginPage";
import { NoFoundPage } from "../components/pages/NoFoundPage/NoFoundPage";
import UserPage from "../components/pages/usuarios/UserPage";
/*import { useContext } from "react";
import UserContext from "../contexts/users/UserContext";
import { Redirect } from "react-router-dom";
*/

const AppRouter = (props) => {

  return (
    <>
      <Switch>
        <Route exact path="/loginPage" component={LoginPage}></Route>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/nuevoInforme" component={NewFormPage}></Route>
        <Route exact path="/listarInformes/:id"
          component={DetailEmisoras}
        ></Route>
        <Route exact path="/listarInformes" component={InformesPage}></Route>
        <Route exact path="/users" component={UserPage}></Route>
        <Route exact path="/emisoras" component={EmisorasPage}></Route>
        <Route exact path="/iglesias" component={IglesiasPage}></Route>
        <Route exact path="/buscarUsuarios"></Route>
        <Route exact path="/eventos"></Route>

        <Route path="*" component={NoFoundPage} />
      </Switch>
    </>
  );
};

export default AppRouter;
