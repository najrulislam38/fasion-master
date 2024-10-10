import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Products from "../Pages/Products/Products";
import ProductDetails from "../Pages/ProductDetails";

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
]);

export default MainRoutes;
