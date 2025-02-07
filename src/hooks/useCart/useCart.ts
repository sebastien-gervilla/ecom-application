import { useContext } from "react";
import { CartContext, CartContextType } from "@/contexts/CartContext";

const useCart = () => {
    return useContext<CartContextType>(CartContext);
}

export default useCart;