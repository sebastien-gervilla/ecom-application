import { AuthenticationContext } from "@/contexts/AuthenticationContext";
import { AuthenticationContextProps, RouteType } from "@/contexts/AuthenticationContext/AuthenticationContext";
import { useContext } from "react";

const useAuthentication = <T extends RouteType = 'public'>() => {
    return useContext<AuthenticationContextProps<T>>(AuthenticationContext);
}

export default useAuthentication;