import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://dummyjson.com",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
