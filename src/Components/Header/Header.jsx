import Container from "../Container/Container";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const pathName = location?.pathname;

  const navLinks = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/products",
      name: "Product",
    },
    {
      path: "/dashboard",
      name: "Dashboard",
    },
  ];
  return (
    <div className="border-b border-gray-300 py-1">
      <Container>
        <div className="navbar ">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
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
                {navLinks?.map((navLink, index) => (
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
            <div className="flex flex-col text-center">
              <h1 className="text-2xl font-semibold leading-none tracking-wider text-primary">
                Fashion
              </h1>
              <p className="text-secondary italic">Master</p>
            </div>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="flex flex-row gap-5">
              {navLinks?.map((navLink, index) => (
                <Link
                  key={index}
                  to={`${navLink?.path}`}
                  className={`${
                    navLink?.path == pathName && "text-primary"
                  } cursor-pointer`}
                  href={navLink?.path}
                >
                  {navLink.name}
                </Link>
              ))}
            </ul>
          </div>
          <div className="navbar-end flex gap-4 items-center">
            <div className="avatar online">
              <div className="ring-primary w-10 rounded-full ring ring-offset-2">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
