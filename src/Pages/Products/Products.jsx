import { useEffect, useState } from "react";
import Container from "../../Components/Container/Container";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]) || [];

  const axiosPublic = useAxiosPublic();

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const result = await axiosPublic.get("/products");
      return result?.data;
    },
  });

  const allProducts = data?.products;

  if (isLoading) {
    return <h1> Loading ....</h1>;
  }
  if (isLoading) {
    return <h1> {error?.message}</h1>;
  }
  console.log(allProducts);

  return (
    <div>
      <h1 className="bg-[#FCFAEE] py-10 md:py-20 text-center text-2xl md:text-3xl lg:text-4xl uppercase tracking-widest">
        All Products
      </h1>

      <div className="my-10 md:my-20">
        <Container>
          <div className="mx-auto">
            <div className="flex gap-5 my-10 ">
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
                      placeholder="Search..."
                      className="px-3 py-1  border bg-white  rounded focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                    />
                  </form>
                  <div className="flex items-center gap-4 my-4">
                    <label htmlFor="sort">Sort By : </label>
                    <select
                      name="sort"
                      id="sort"
                      className="bg-white px-3 py-1 text-black  border rounded focus:ring-1 focus:ring-primary text-sm"
                    >
                      <option value="">Default</option>
                      <option value="highToLowPrice">High To Low</option>
                      <option value="lowToHighPrice">Low To High</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* content area */}
              {allProducts?.length > 0 ? (
                <div className="lg:w-4/5 w-full">
                  <div className="grid gap-5 grid-cols-1 md:grid-cols-3  mx-4">
                    {allProducts?.map((data, index) => (
                      <div
                        key={index}
                        className="rounded shadow-sm border mx-auto w-full"
                      >
                        <figure className="p-3 w-full bg-[#FCFAEE]">
                          <img
                            src={data?.thumbnail}
                            alt="Product"
                            className="w-full h-56 object-contain rounded-sm"
                          />
                        </figure>
                        <div className="px-5 mt-3 space-y-2 ">
                          <h4 className="text-center text-lg">{data?.title}</h4>
                          <div className="font-medium flex text-center items-center justify-center gap-1">
                            <p className="text-primary">
                              $ {data?.discountPercentage}
                            </p>
                            <p className="text-gray-500 text-sm text line-through ">
                              ${data?.price}
                            </p>
                          </div>

                          <div className="card-actions justify-center py-4 mb-6">
                            <Link
                              to={`/product-details/${data?.title
                                .replace(/\s+/g, "-")
                                .toLowerCase()}/${data?.id}`}
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
