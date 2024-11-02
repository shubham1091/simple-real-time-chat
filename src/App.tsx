import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";

import Room from "./pages/Room";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./utils/AuthContext";
import RegisterPage from "./pages/RegisterPage";
console.log("Collection ID:", import.meta.env.VITE_COLLECTION_ID);


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            path="/register"
            element={<RegisterPage />}
          />
          <Route element={<PrivateRoutes />}>
            <Route
              path="/"
              element={<Room />}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
