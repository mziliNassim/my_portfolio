import { toast } from "sonner";
import { clearAdmin } from "../features/adminSlice";
import { useDispatch } from "react-redux";

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
