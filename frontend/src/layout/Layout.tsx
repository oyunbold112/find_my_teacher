import Footer from "../components/Footer";
import Header from "../components/HeaderMenu";
import Menu from "../components/Menu";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="layout">
      <Menu>
        <Header />
      </Menu>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;