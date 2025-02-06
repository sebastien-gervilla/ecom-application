import { Request } from "@/services/order-service/helpers/request";
import { OrderService } from "@/services/order-service";

export const search = async (controller: AbortController, query: OrderService.Requests.Product.Search['query']) => {

    const response = await Request.get<
        OrderService.Requests.Product.Search,
        OrderService.Responses.Product.Search
    >({
        url: '/products/search',
        query,
        options: {
            signal: controller.signal
        }
    });

    return response
}