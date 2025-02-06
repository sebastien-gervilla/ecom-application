import { Request } from "@/services/order-service/helpers/request";
import { OrderService } from "@/services/order-service";

export const logout = async () => {

    const response = await Request.post<
        OrderService.Requests.User.Logout,
        OrderService.Responses.User.Logout
    >({
        url: '/users/logout'
    });

    return response
}