import { Request } from "@/services/order-service/helpers/request";
import { OrderService } from "@/services/order-service";

export const create = async (body: OrderService.Requests.Order.Post['body']) => {

    const response = await Request.post<
        OrderService.Requests.Order.Post,
        OrderService.Responses.Order.Post
    >({
        url: '/orders',
        body,
    });

    return response
}