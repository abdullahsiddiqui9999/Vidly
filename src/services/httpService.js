import axios from "axios";
import { toast } from "react-toastify";

// axios.interceptors.response.use(null, (error) => {
//   const expectedError =
//     error.response &&
//     error.response.status >= 400 &&
//     error.response.status < 500;

//   if (!expectedError) {
//     console.log("Something went wrong!");
//     toast.error("Something went wrong!");
//   }

//   Promise.reject(error);
// });

export default {
  get: axios.get,
  put: axios.put,
  patch: axios.patch,
  post: axios.post,
  delete: axios.delete,
};
