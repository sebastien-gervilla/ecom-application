import { ReactNode } from "react";
import { CartContext } from "./CartContext";
import { useLocalStorage } from "@/hooks";

interface Props {
    children: ReactNode;
}

export const CartContextProvider = ({ children }: Props) => {

    const [cart, setCart] = useLocalStorage('cart', []);

    return (
        <CartContext.Provider value={{
            cart,
            setCart,
        }}>
            {children}
        </CartContext.Provider>
    );
};