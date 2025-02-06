import { Request } from "@/services/order-service/helpers/request";
import { OrderService } from "@/services/order-service";

export const register = async (userRegister: OrderService.Requests.User.Register['body']) => {

    const response = await Request.post<
        OrderService.Requests.User.Register,
        OrderService.Responses.User.Register
    >({
        url: '/users/register',
        body: userRegister
    });

    return response
}