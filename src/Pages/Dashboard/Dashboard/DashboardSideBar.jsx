// import { IoSpeedometerSharp } from "react-icons/

import { Link, useLocation } from "react-router-dom";

const DashBoardSideBar = () => {
  const location = useLocation();
  const pathName = location?.pathname;
  const links = [
    {
      path: "/dashboard",
      name: "Dashboard",
    },
    {
      path: "/dashboard/all-products",
      name: "All Products",
    },
    {
      path: "/dashboard/add-product",
      name: "Add Product",
    },
  ];
  return (
    <div className="relative max-w-md bg-[#FCFAEE] h-full border-r border-gray-400 px-5 py-10">
      <div className="flex flex-col text-center">
        <h1 className="text-2xl font-semibold leading-none tracking-wider text-primary">
          Fashion
        </h1>
        <p className="text-secondary italic">Master</p>
      </div>

      <div className=" flex flex-col gap-1 p-5">
        {links?.map((link, index) => (
          <Link
            to={`${link?.path}`}
            key={index}
            className={`${
              link?.path == pathName && "text-primary"
            }  cursor-pointer my-1 hover:text-primary duration-200`}
            href={link?.path}
          >
            {link.name}
          </Link>
        ))}
      </div>
      <hr />
      <div className="mt-10">
        <Link
          to={"/"}
          className="px-5 cursor-pointer my-1 hover:text-primary duration-200"
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default DashBoardSideBar;
