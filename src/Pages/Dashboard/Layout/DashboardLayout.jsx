import { Outlet } from "react-router-dom";
import Container from "../../../Components/Container/Container";
import DashBoardSideBar from "../Dashboard/DashboardSideBar";
import Footer from "../../../Components/Footer/Footer";

const DashboardLayout = () => {
  return (
    <div>
      <Container>
        <div className="lg:flex">
          <di className="lg:w-1/5">
            <DashBoardSideBar />
          </di>
          <div className="lg:w-4/5">
            <Outlet />
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
