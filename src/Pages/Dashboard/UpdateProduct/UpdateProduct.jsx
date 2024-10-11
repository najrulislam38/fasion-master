import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";
import { useEffect } from "react";
import Swal from "sweetalert2";

const UpdateProduct = () => {
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();

  // Fetch the product by ID
  const {
    isLoading,
    error,
    data: product,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => axiosPublic.get(`/products/${id}`).then((res) => res.data),
  });

  // Fetch categories
  const { isLoading: loadingCategories, data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      axiosPublic.get("/products/categories").then((res) => res.data),
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  // image control
  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: "images",
  });

  const onSubmit = (data) => {
    console.log(data);
    const updatedProduct = {
      title: data?.title,
      price: data?.price,
      discountPercentage: data?.discountPercentage,
      brand: data?.brand,
      category: data?.category,
      images: data?.images,
      description: data?.description,
      rating: data?.rating,
    };

    axiosPublic
      .put(`/products/${id}`, updatedProduct)
      .then((res) => {
        if (res.status === 200) {
          reset();
          Swal.fire({
            title: "Update success",
            text: "Product Updated successfully",
            icon: "success",
          });
        }
      })
      .catch((error) => {
        if (error) {
          Swal.fire({
            title: "Something Wrong",
            text: "Product Update Fail",
            icon: "error",
          });
        }
      });
  };

  useEffect(() => {
    if (product) {
      reset(product);
      if (product.images) {
        product.images.forEach((image) => appendImage(image)); // Append existing images
      }
    }
  }, [product, reset, appendImage]);

  if (isLoading || loadingCategories) {
    return <h1> Loading ....</h1>;
  }
  if (error) {
    return <h1> {error?.message}</h1>;
  }

  return (
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
                {...register("brand")}
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

            {/* Dynamic Category Select */}
            <div>
              <label className="block mb-2 font-medium">Category</label>
              <select
                {...register("category", { required: "Category is required" })}
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

            {/* Dimensions */}
            <div>
              <label className="block mb-2 font-medium">
                Dimensions (Width)
              </label>
              <input
                {...register("dimensions.width", { valueAsNumber: true })}
                type="number"
                step="0.01"
                className="w-full p-3 border rounded-sm bg-white text-black"
                placeholder="Enter width"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">
                Dimensions (Height)
              </label>
              <input
                {...register("dimensions.height", { valueAsNumber: true })}
                type="number"
                step="0.01"
                className="w-full p-3 border rounded-sm bg-white text-black"
                placeholder="Enter height"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">
                Dimensions (Depth)
              </label>
              <input
                {...register("dimensions.depth", { valueAsNumber: true })}
                type="number"
                step="0.01"
                className="w-full p-3 border rounded-sm bg-white text-black"
                placeholder="Enter depth"
              />
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

            {/* Minimum Order Quantity */}
            <div>
              <label className="block mb-2 font-medium">
                Minimum Order Quantity
              </label>
              <input
                {...register("minimumOrderQuantity", {
                  required: "Minimum order quantity is required",
                })}
                type="number"
                className="w-full p-3 border rounded-sm bg-white text-black"
                placeholder="Enter minimum order quantity"
              />
              {errors.minimumOrderQuantity && (
                <p className="text-red-500 mt-1">
                  {errors.minimumOrderQuantity.message}
                </p>
              )}
            </div>

            {/* Stock */}
            <div>
              <label className="block mb-2 font-medium">Stock</label>
              <input
                {...register("stock", {
                  required: "Stock is required",
                  valueAsNumber: true,
                })}
                type="number"
                className="w-full p-3 border rounded-sm bg-white text-black"
                placeholder="Enter stock quantity"
              />
              {errors.stock && (
                <p className="text-red-500 mt-1">{errors.stock.message}</p>
              )}
            </div>

            {/* Shipping Information */}
            <div>
              <label className="block mb-2 font-medium">
                Shipping Information
              </label>
              <input
                {...register("shippingInformation", {
                  required: "Shipping information is required",
                })}
                className="w-full p-3 border rounded-sm bg-white text-black"
                placeholder="Enter shipping information"
              />
              {errors.shippingInformation && (
                <p className="text-red-500 mt-1">
                  {errors.shippingInformation.message}
                </p>
              )}
            </div>

            {/* SKU */}
            <div>
              <label className="block mb-2 font-medium">SKU</label>
              <input
                {...register("sku", { required: "SKU is required" })}
                type="text"
                className="w-full p-3 border rounded-sm bg-white text-black"
                placeholder="Enter SKU"
              />
              {errors.SKU && (
                <p className="text-red-500 mt-1">{errors.SKU.message}</p>
              )}
            </div>

            {/* Warranty Information */}
            <div>
              <label className="block mb-2 font-medium">
                Warranty Information
              </label>
              <input
                {...register("warrantyInformation", {
                  required: "Warranty information is required",
                })}
                rows="3"
                className="w-full p-3 border rounded-sm bg-white text-black"
                placeholder="Enter warranty information"
              />
              {errors.warrantyInformation && (
                <p className="text-red-500 mt-1">
                  {errors.warrantyInformation.message}
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

          {/* Images */}
          <div className="max-w-4xl my-6">
            <label className="block mb-2 font-medium">Images</label>
            {imageFields.map((item, index) => (
              <div key={item.id} className="flex gap-2 mb-2">
                <input
                  {...register(`images.${index}`, {
                    required: "Image URL is required",
                  })}
                  type="text"
                  className="w-full p-3 border rounded-sm bg-white text-black"
                  placeholder="Enter image URL"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="py-2 px-4 rounded-sm bg-primary hover:bg-secondary text-sm uppercase tracking-wide text-white duration-300"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendImage("")}
              className="py-2 px-4 rounded-sm bg-primary hover:bg-secondary text-sm uppercase tracking-wide text-white duration-300 "
            >
              Add Image
            </button>
            {errors.images && (
              <p className="text-red-500 mt-1">{errors.images.message}</p>
            )}
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
              <p className="text-red-500 mt-1">{errors.description.message}</p>
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
  );
};

export default UpdateProduct;
