import { createContext } from "react";
import { OrderService } from "@/services/order-service";

export type RouteType = 'public' | 'protected';

export interface AuthenticationContextProps<T extends RouteType = 'public'> {
    isLoading: boolean;
    user: T extends 'public'
    ? OrderService.Models.User.Current | null
    : OrderService.Models.User.Current;
    login: (username: string, password: string) => Promise<boolean | void>;
    logout: () => void;
    isAuthenticated: boolean;
}

export const AuthenticationContext = createContext<AuthenticationContextProps<RouteType>>(null!);