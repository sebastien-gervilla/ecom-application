import { Request } from "@/services/order-service/helpers/request";
import { OrderService } from "@/services/order-service";

export const get = async (controller: AbortController, query: OrderService.Requests.Product.Get['query']) => {

    const response = await Request.get<
        OrderService.Requests.Product.Get,
        OrderService.Responses.Product.Get
    >({
        url: '/products',
        query,
        options: {
            signal: controller.signal
        }
    });

    return response
}