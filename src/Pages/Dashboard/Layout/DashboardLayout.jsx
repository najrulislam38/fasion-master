import { Outlet } from "react-router-dom";
import DashBoardSideBar from "../Dashboard/DashboardSideBar";
import Footer from "../../../Components/Footer/Footer";

const DashboardLayout = () => {
  return (
    <div>
      <div className="lg:flex">
        <di className="lg:w-1/5">
          <DashBoardSideBar />
        </di>
        <div className="lg:w-4/5">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
