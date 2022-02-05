import { BrowserRouter as Router } from "react-router-dom";
import EmisoraProvider from "./contexts/emisoraContext/EmisoraProvider.js";
import UserProvider from "./contexts/users/UserProvider.js";
import Layout from "./navigators/Layout";
import AppRouter from "./Routers/AppRouter";

function App() {
  return (
    <div>
      <Router>
        <UserProvider>
          <EmisoraProvider>
            <Layout>
              <AppRouter />
            </Layout>
          </EmisoraProvider>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
