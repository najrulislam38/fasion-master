import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/16/solid";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import Loading from "../../../Components/Loading/Loading";

const AllProducts = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: products,
    isLoading,

    error,
    refetch,
  } = useQuery({
    queryKey: ["all-products"],
    queryFn: async () => {
      const response = await axiosPublic
        .get("/products")
        .then((res) => res.data);
      return response?.products;
    },
  });

  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to Delete this Product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`products/${id}`)
          .then((res) => {
            if (res.status === 200) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: `${error?.message}`,
              icon: "error",
            });
          });
      }
    });
  };

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <p> {error?.message}</p>;
  }

  let count = 0;

  return (
    <div className="min-h-screen">
      <h1 className="bg-[#FCFAEE] py-10  text-center text-xl md:text-xl uppercase tracking-widest mb-3">
        All Product
      </h1>
      <div className="p-10">
        <h5 className="text-lg md:text-xl tracking-wide font-medium">
          Total Products: {products?.length}
        </h5>
        <div className=" border border-black rounded-sm mt-6 ">
          <div className="overflow-x-auto">
            <table className="table ">
              {/* head */}
              <thead>
                <tr className="text-black">
                  <th>SL</th>
                  <th>Image</th>
                  <th>Regular Price</th>
                  <th>Discount Price</th>
                  <th>Stock</th>
                  <th>Edit</th>
                  <th>Remove Item</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((data, idx) => (
                  <tr key={idx}>
                    <td>{(count = count + 1)}</td>

                    <td className="">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-16 w-16">
                            <img
                              src={data?.images[0]}
                              alt="product image"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{data?.title}</td>
                    <td>{data?.price}</td>
                    <td>
                      {(
                        data?.price -
                        (data?.price * data?.discountPercentage) / 100
                      ).toFixed(2)}
                    </td>
                    <td>
                      <Link to={`/dashboard/update-product/${data?.id}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-5 text-primary cursor-pointer hover:text-secondary duration-200"
                        >
                          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                          <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                        </svg>
                      </Link>
                    </td>

                    <td>
                      <button onClick={() => handleDeleteProduct(data?.id)}>
                        <TrashIcon className="size-5 text-red-500 hover:scale-105 hover:text-secondary duration-200" />
                      </button>
                    </td>
                  </tr>
                ))}
                {/* {products?.map((product, index) => 
                  <tr key={index}>
                    <td>{(count = count + 1)}</td>
                    <td>
                      <img src={product?.images[0]} alt="" />
                    </td>
                    <td>{product?.title}</td>
                  </tr>;
                )} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
