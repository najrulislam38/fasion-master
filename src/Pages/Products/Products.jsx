import { useState } from "react";
import Container from "../../Components/Container/Container";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import Loading from "../../Components/Loading/Loading";

const Products = () => {
  const axiosPublic = useAxiosPublic();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sortBy, setSortBy] = useState("none");
  const [searchingProducts, setSearchingProduct] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", searchingProducts],
    queryFn: async () => {
      const result = await axiosPublic.get(
        `/products?search=${searchingProducts}`
      );
      return result?.data;
    },
    enabled: !!searchingProducts || searchingProducts === "",
  });

  const allProducts = data?.products;

  const handleSearch = (result) => {
    setSearchingProduct(result);
  };

  const sortedProducts =
    sortBy === "none"
      ? allProducts
      : allProducts?.sort((a, b) => {
          switch (sortBy) {
            case "highToLowPrice":
              return a.price - b.price;
            case "lowToHighPrice":
              return b.price - a.price;
            default:
              return 0;
          }
        });

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <p> {error?.message}</p>;
  }
  // console.log(allProducts);

  return (
    <div>
      <h1 className="bg-[#FCFAEE] py-10 md:py-20 text-center text-2xl md:text-3xl lg:text-4xl uppercase tracking-widest">
        All Products
      </h1>

      <div className="my-10 md:my-20">
        <Container>
          <div className="mx-auto">
            {/* Drawar Modal */}
            <div className="lg:hidden flex justify-between p-4">
              <h2 className="text-lg font-medium">Filter Options</h2>
              <button onClick={() => setDrawerOpen(!drawerOpen)}>
                {drawerOpen ? (
                  <XMarkIcon className="size-6 " />
                ) : (
                  <Bars3Icon className="size-6 " />
                )}{" "}
                {/* Icon toggle */}
              </button>
            </div>

            {/* Sidebar */}
            <div
              className={`lg:hidden fixed inset-0 bg-white z-50 transition-transform transform ${
                drawerOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="p-4">
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="absolute top-4 right-4"
                >
                  <XMarkIcon className="size-6 " />
                </button>

                <div>
                  <h3 className="text-center text-xl md:3xl uppercase tracking-wider mb-7">
                    Filters
                  </h3>
                  <form className="flex flex-row flex-wrap gap-4 items-center">
                    <label htmlFor="search">Search : </label>
                    <input
                      id="search"
                      type="text"
                      placeholder="Search..."
                      className="px-3 py-1  border bg-white  rounded focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                    />
                  </form>
                  <div className="flex items-center gap-4 my-4">
                    <label htmlFor="sort">Sort By : </label>
                    <select
                      onChange={(e) => {
                        setSortBy(e.target.value);
                      }}
                      name="sort"
                      id="sort"
                      className="bg-white px-3 py-1 text-black  border rounded focus:ring-1 focus:ring-primary text-sm"
                    >
                      <option value="none">Default</option>
                      <option value="highToLowPrice">High To Low</option>
                      <option value="lowToHighPrice">Low To High</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-5 my-10 ">
              {/* Drawer Button for small devices */}

              {/* side bar */}
              <div className="hidden p-5  lg:block  border-r-2 border-gray-300  ">
                <div>
                  <h3 className="text-center text-xl md:3xl uppercase tracking-wider mb-7">
                    Filters
                  </h3>
                  <form className="flex flex-row flex-wrap gap-4 items-center">
                    <label htmlFor="search">Search : </label>
                    <input
                      id="search"
                      type="text"
                      onChange={(e) => handleSearch(e.target.value)}
                      placeholder="Search here"
                      className="px-3 py-1  border bg-white  rounded focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                    />
                  </form>
                  <div className="flex items-center gap-4 my-4">
                    <label htmlFor="sort">Sort By : </label>
                    <select
                      onChange={(e) => {
                        setSortBy(e.target.value);
                      }}
                      name="sort"
                      id="sort"
                      className="bg-white px-3 py-1 text-black  border rounded focus:ring-1 focus:ring-primary text-sm"
                    >
                      <option value="none">Default</option>
                      <option value="highToLowPrice">High To Low</option>
                      <option value="lowToHighPrice">Low To High</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* content area */}
              {sortedProducts?.length > 0 ? (
                <div className="lg:w-4/5 w-full">
                  <div className="grid gap-5 grid-cols-1 md:grid-cols-3  mx-4">
                    {allProducts?.map((data, index) => (
                      <div
                        key={index}
                        className="group rounded shadow-sm border mx-auto w-full cursor-pointer"
                      >
                        <figure className="p-3 w-full bg-[#FCFAEE]">
                          <img
                            src={data?.thumbnail}
                            alt="Product"
                            className="w-full h-56 object-contain rounded-sm group-hover:scale-110 duration-300 "
                            loading="lazy"
                          />
                        </figure>
                        <div className="px-5 mt-3 space-y-2 ">
                          <h4 className="text-center text-lg">{data?.title}</h4>
                          <div className="font-medium flex text-center items-center justify-center gap-1">
                            <p className="text-primary">${data?.price}</p>
                            <p className=" text-gray-500 text-sm text line-through ">
                              ${" "}
                              {(
                                data.price -
                                (data.price * data.discountPercentage) / 100
                              ).toFixed(2)}
                            </p>
                          </div>

                          <div className="card-actions justify-center py-4 mb-6">
                            <Link
                              to={`/product-details/${data?.id}`}
                              className="py-2 px-4 rounded-sm bg-primary hover:bg-secondary text-sm uppercase tracking-wide text-white duration-300 "
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center w-full">
                  <h1 className="text-xl md:text-3xl text-center">
                    There is not a product here
                  </h1>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Products;
