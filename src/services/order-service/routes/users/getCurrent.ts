import { Request } from "@/services/order-service/helpers/request";
import { OrderService } from "@/services/order-service";

export const getCurrent = async () => {

    const response = await Request.get<
        OrderService.Requests.User.Current,
        OrderService.Responses.User.Current
    >({
        url: '/users/current'
    });

    return response
}