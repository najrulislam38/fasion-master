import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Products from "../Pages/Products/Products";
import ProductDetails from "../Pages/Shared/ProductDetails";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import DashboardLayout from "../Pages/Dashboard/Layout/DashboardLayout";
import AllProducts from "../Pages/Dashboard/AllProducts/AllProducts";
import UpdateProduct from "../Pages/Dashboard/UpdateProduct/UpdateProduct";
import AddNewProduct from "../Pages/Dashboard/AddNewProduct/AddNewProduct";

const MainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/product-details/:id",
        element: <ProductDetails />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/all-products",
        element: <AllProducts />,
      },
      {
        path: "/dashboard/update-product/:id",
        element: <UpdateProduct />,
      },
      {
        path: "/dashboard/add-product",
        element: <AddNewProduct />,
      },
    ],
  },
]);

export default MainRoutes;
