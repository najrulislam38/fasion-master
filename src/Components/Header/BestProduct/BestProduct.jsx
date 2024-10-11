import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Container from "../../Container/Container";
import { Link } from "react-router-dom";

const BestProduct = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["best-products"],
    queryFn: () =>
      axiosPublic.get("/products").then((res) => res.data?.products),
  });

  console.log(products);

  return (
    <div className="my-10 md:my-20">
      <Container>
        <div>
          <h2 className="text-lg md:text-2xl text-center uppercase font-medium">
            Best Products
          </h2>
          <div>
            <div className="mt-6 w-full">
              <div className="grid gap-5 grid-cols-1 md:grid-cols-3  lg:grid-cols-5 mx-4">
                {products?.map((data, index) => (
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
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BestProduct;
