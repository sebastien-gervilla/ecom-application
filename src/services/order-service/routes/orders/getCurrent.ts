import { Request } from "@/services/order-service/helpers/request";
import { OrderService } from "@/services/order-service";

export const getCurrent = async (controller: AbortController, query: OrderService.Requests.Order.Get['query']) => {

    const response = await Request.get<
        OrderService.Requests.Order.Get,
        OrderService.Responses.Order.Get
    >({
        url: '/orders/current-user',
        query,
        options: {
            signal: controller.signal
        }
    });

    return response
}