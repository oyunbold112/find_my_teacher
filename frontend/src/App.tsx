import { Route, Routes } from "react-router-dom";
import "./App.css";

import Layout from "./layout/Layout";
import AboutPage from "./components/About";
import Teachers from "./components/Teachers";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/HomePage";
import LessonsPage from "./components/LessonsPage";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";
import ReservationPage from "./components/ReservationPage";
import { ReservationProvider } from "./contexts/reservationContext";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="teachers" element={<Teachers />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="/reservation" element={<ReservationProvider><ReservationPage/></ReservationProvider>}/>
            <Route path="register" element={<RegisterPage />} />
            {/* protected page */}
            {/* <Route element={<PrivateRoute />}> */}
              <Route path="lessons" element={<LessonsPage />} />
            {/* </Route> */}
          </Route>
          
        </Routes>

      </AuthProvider>
    </>
  );
}

export default App;
