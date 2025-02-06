import { FC, ReactNode, useEffect, useState } from "react";
import { AuthenticationContext } from "./AuthenticationContext";
import { orderService, OrderService } from "@/services/order-service";

interface Props {
    children: ReactNode;
}

const AuthenticationContextProvider: FC<Props> = ({ children }) => {

    const [user, setUser] = useState<OrderService.Models.User.Current | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const login = async (email: string, password: string) => {
        if (!password.length) return setIsLoading(false);

        const loginResponse = await orderService.users.login({
            email,
            password,
        });

        if (!loginResponse.is(204))
            return setIsLoading(false);

        const response = await orderService.users.getCurrent();
        if (!response.is(200))
            return setIsLoading(false);

        setUser(response.body.data);

        setIsLoading(false);
        return true;
    }

    const logout = async () => {
        await orderService.users.logout();
        setUser(null);
    }

    useEffect(() => {
        (async () => {
            const sessionUser = await getUserFromSession();

            if (sessionUser)
                setUser(sessionUser);

            setIsLoading(false);
        })()
    }, []);

    return (
        <AuthenticationContext.Provider value={{ isLoading, isAuthenticated: !!user, login, logout, user }}>
            {children}
        </AuthenticationContext.Provider>
    );
};

export default AuthenticationContextProvider;

const getUserFromSession = async (): Promise<OrderService.Models.User.Current | null> => {
    const response = await orderService.users.getCurrent();
    if (!response.is(200))
        return null;

    return response.body.data;
}