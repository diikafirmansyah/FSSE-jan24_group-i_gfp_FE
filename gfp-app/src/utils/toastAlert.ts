import { toast } from 'react-toastify';

type ToastType = "success" | "error" | "info";

export const toastAlert = (type: ToastType, message: string): void => {
    if (type === "success") {
        toast.success(message, {
            position: "top-center"
        });
    } else if (type === "error") {
        toast.error(message, {
            position: "top-center"
        });
    } else if (type === "info") {
        toast.info(message, {
            position: "top-center"
        });
    }
};
