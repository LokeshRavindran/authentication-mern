import { toast } from "react-toastify";

const TOAST_CONFIG = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  theme: "light",
};

export const successToast = (message) => {
  toast.success(message, TOAST_CONFIG);
};

export const errorToast = (message) => {
  toast.error(message, TOAST_CONFIG);
};
