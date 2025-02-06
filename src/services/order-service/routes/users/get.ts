import { Request } from "@/services/order-service/helpers/request";
import { OrderService } from "@/services/order-service";

export const get = async (controller: AbortController, query: OrderService.Requests.User.Get['query']) => {

    const response = await Request.get<
        OrderService.Requests.User.Get,
        OrderService.Responses.User.Get
    >({
        url: '/users',
        query,
        options: {
            signal: controller.signal
        }
    });

    return response
}