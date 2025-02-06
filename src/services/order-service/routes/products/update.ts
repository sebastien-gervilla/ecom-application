import { Request } from "@/services/order-service/helpers/request";
import { OrderService } from "@/services/order-service";

export const update = async (id: number, body: OrderService.Requests.Product.Put['body']) => {

    const response = await Request.put<
        OrderService.Requests.Product.Put,
        OrderService.Responses.Product.Put
    >({
        url: `/products/${id}`,
        body,
    });

    return response
}