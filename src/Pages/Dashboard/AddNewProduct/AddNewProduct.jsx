import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AddNewProduct = () => {
  const axiosPublic = useAxiosPublic();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosPublic
        .get("/products/categories")
        .then((res) => res.data);
      return response;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    axiosPublic
      .post("/products/add", data)
      .then((res) => {
        if (res?.data) {
          reset();
          Swal.fire({
            title: "Add successful",
            text: "Product Added successfully",
            icon: "success",
          });
        }
      })
      .catch((error) => {
        if (error) {
          Swal.fire({
            title: "Something Wrong",
            text: "Product Added Fail",
            icon: "error",
          });
        }
      });
  };

  return (
    <div>
      <div className="min-h-screen">
        <h1 className="bg-[#FCFAEE] py-10  text-center text-xl md:text-2xl uppercase tracking-widest">
          Product Update
        </h1>
        <div className="mx-auto p-6 lg:mx-10 mt-1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* title */}
              <div>
                <label className="block mb-2 font-medium">Title</label>
                <input
                  {...register("title", { required: "Title is required" })}
                  type="text"
                  className="w-full p-3 border rounded-sm bg-white text-black"
                  placeholder="Enter product title"
                />
                {errors.title && (
                  <p className="text-red-500 mt-1">{errors.title.message}</p>
                )}
              </div>

              {/* brand */}
              <div>
                <label className="block mb-2 font-medium">Brand</label>
                <input
                  {...register("brand", { required: "Brand is Required" })}
                  type="text"
                  className="w-full p-3 border rounded-sm bg-white text-black"
                  placeholder="Enter brand name"
                />
              </div>

              {/* Availability Status */}
              <div>
                <label className="block mb-2 font-medium">
                  Availability Status
                </label>

                <select
                  {...register("availabilityStatus", {
                    required: "Availability status is required",
                  })}
                  className="w-full p-3 border rounded-sm bg-white text-black"
                >
                  <option value="">Select Availability Status</option>
                  <option value={"In Stock"}>In Stock</option>
                  <option value={"Low Stock"}>Low Stock</option>
                  <option value={"Out Of Stock"}>Out Of Stock</option>
                </select>
                {errors.availabilityStatus && (
                  <p className="text-red-500 mt-1">
                    {errors.availabilityStatus.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block mb-2 font-medium">Category</label>
                <select
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className="w-full p-3 border rounded-sm bg-white text-black"
                >
                  <option value="">Select category</option>
                  {categories?.map((category, idx) => (
                    <option key={idx} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 mt-1">{errors.category.message}</p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block mb-2 font-medium">Price</label>
                <input
                  {...register("price", { required: "Price is required" })}
                  type="number"
                  step="0.01"
                  className="w-full p-3 border rounded-sm bg-white text-black"
                  placeholder="Enter product price"
                />
                {errors.price && (
                  <p className="text-red-500 mt-1">{errors.price.message}</p>
                )}
              </div>

              {/* Discount Percentage */}
              <div>
                <label className="block mb-2 font-medium">
                  Discount Percentage
                </label>
                <input
                  {...register("discountPercentage", {
                    required: "Discount percentage is required",
                  })}
                  type="number"
                  step="0.01"
                  className="w-full p-3 border rounded-sm bg-white text-black"
                  placeholder="Enter discount percentage"
                />
                {errors.discountPercentage && (
                  <p className="text-red-500 mt-1">
                    {errors.discountPercentage.message}
                  </p>
                )}
              </div>

              {/* Weight */}
              <div>
                <label className="block mb-2 font-medium">Weight</label>
                <input
                  {...register("weight", { required: "Weight is required" })}
                  type="number"
                  step="0.01"
                  className="w-full p-3 border rounded-sm bg-white text-black"
                  placeholder="Enter product weight"
                />
                {errors.weight && (
                  <p className="text-red-500 mt-1">{errors.weight.message}</p>
                )}
              </div>

              {/* Return Policy */}
              <div>
                <label className="block mb-2 font-medium">Return Policy</label>
                <input
                  {...register("returnPolicy", {
                    required: "Return policy is required",
                  })}
                  className="w-full p-3 border rounded-sm bg-white text-black"
                  placeholder="Enter return policy"
                />
                {errors.returnPolicy && (
                  <p className="text-red-500 mt-1">
                    {errors.returnPolicy.message}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="max-w-4xl">
              <label className="block mb-2 font-medium">Description</label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                className="w-full p-3 border rounded-sm bg-white text-black"
                placeholder="Enter product description"
              />
              {errors.description && (
                <p className="text-red-500 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className=" w-full text-center my-6 ">
              <button
                type="submit"
                className=" w-fit mx-auto py-2 px-4 rounded-sm bg-primary hover:bg-secondary  uppercase tracking-wide text-white duration-300 "
              >
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;
