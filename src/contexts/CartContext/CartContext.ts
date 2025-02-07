import { createContext } from "react";
import { ApplicationStorage } from "@/helpers/storage";

export type CartContextType = {
    cart: ApplicationStorage['cart'],
    setCart: (cart: ApplicationStorage['cart']) => void,
};

const defaultContext: CartContextType = {
    cart: [],
    setCart: () => {
        throw new Error("Not implemented.")
    },
};

export const CartContext = createContext(defaultContext);