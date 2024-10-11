import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Container from "../../Components/Container/Container";
import { ShoppingBagIcon, ShoppingCartIcon } from "@heroicons/react/16/solid";
import Loading from "../../Components/Loading/Loading";

const ProductDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const { data, isLoading, error } = useQuery({
    queryKey: ["product-details"],
    queryFn: async () => {
      const result = await axiosPublic.get(`products/${id}`);
      return result?.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  if (isLoading) {
    return <p> {error?.message}</p>;
  }

  console.log(data);

  return (
    <div>
      <h1 className="bg-[#FCFAEE] py-10 md:py-20 text-center text-2xl md:text-3xl lg:text-4xl uppercase tracking-widest">
        Product Details
      </h1>
      <Container>
        <div className="flex flex-col md:flex-row gap-6 lg:gap-12 my-10 md:my-20 items-start justify-between ">
          <div className="w-full md:w-1/2 bg-[#FCFAEE] p-5 md:p-8 rounded-lg">
            <img
              src={data?.images[0]}
              alt="product image"
              loading="lazy"
              className="w-full"
            />
          </div>
          <div className="w-full md:w-1/2  p-5 md:p-8 ">
            <h3 className="text-xl md:text-2xl tracking-wider font-medium">
              {data?.title}
            </h3>
            <div className="space-y-2 my-6">
              <p className="font-medium">
                Regular Price:{" "}
                <span className="line-through text-gray-500">
                  {data?.price}
                </span>
              </p>
              <p className="font-medium">
                Discount Price:{" "}
                <span className="text-primary">
                  {(
                    data?.price -
                    (data?.price * data?.discountPercentage) / 100
                  ).toFixed(2)}
                </span>
              </p>
              <p className="font-medium">
                Discount:{" "}
                <span className="text-gray-500">
                  {data?.discountPercentage} %
                </span>
              </p>
              <p className="font-medium">
                Rating: <span className="text-gray-500">{data?.rating}</span>
                <div className="rating rating-sm ml-1">
                  <input
                    type="radio"
                    name="rating-5"
                    className="mask mask-star-2 bg-orange-300"
                  />
                </div>
              </p>
              <p className="font-medium">
                Available:{" "}
                <span className="text-gray-500">{data?.rating} Pice</span>
              </p>
              <p className="text-justify text-gray-500 text-sm md:text-base">
                {data?.description}
              </p>
            </div>

            <div className="mt-6 md:mt-12 flex gap-5">
              <button className="py-2 px-4 rounded-sm bg-primary hover:bg-secondary text-sm uppercase tracking-wide text-white duration-300 ">
                <ShoppingCartIcon className="size-6 inline mr-3" /> Add To Card
              </button>
              <button className="flex items-center gap-3 py-2 px-4 rounded-sm bg-secondary hover:bg-primary text-sm uppercase tracking-wide text-white duration-300 ">
                <ShoppingBagIcon className="size-5 inline " />{" "}
                <span>By Now</span>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetails;
