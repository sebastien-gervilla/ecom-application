import { Request } from "@/services/order-service/helpers/request";
import { OrderService } from "@/services/order-service";

export const login = async (userLogin: OrderService.Requests.User.Login['body']) => {

    const response = await Request.post<
        OrderService.Requests.User.Login,
        OrderService.Responses.User.Login
    >({
        url: '/users/login',
        body: userLogin
    });

    return response
}