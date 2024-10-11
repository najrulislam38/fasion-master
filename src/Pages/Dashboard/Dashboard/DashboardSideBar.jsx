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
    <div className=" bg-[#FCFAEE] h-full ">
      <div className="flex items-center justify-between lg:hidden bg-white border-b border-gray-400 w-full p-5">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links?.map((navLink, index) => (
              <Link
                to={`${navLink?.path}`}
                key={index}
                className={`${
                  navLink?.path == pathName && "text-primary"
                } text-sm cursor-pointer my-1`}
                href={navLink?.path}
              >
                {navLink.name}
              </Link>
            ))}
          </ul>
        </div>
        <Link to={"/"}>
          <div className="flex flex-col text-center">
            <h1 className="text-2xl font-semibold leading-none tracking-wider text-primary">
              Fashion
            </h1>
            <p className="text-secondary italic">Master</p>
          </div>
        </Link>
      </div>
      <div className="relative hidden lg:block max-w-md bg-[#FCFAEE] h-full border-r border-gray-400 px-5 py-10">
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
    </div>
  );
};

export default DashBoardSideBar;
