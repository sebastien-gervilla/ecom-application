import { Request } from "@/services/order-service/helpers/request";
import { OrderService } from "@/services/order-service";

export const create = async (body: OrderService.Requests.Product.Post['body']) => {

    const response = await Request.post<
        OrderService.Requests.Product.Post,
        OrderService.Responses.Product.Post
    >({
        url: '/products',
        body,
    });

    return response
}