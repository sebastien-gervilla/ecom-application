import { Request } from "@/services/order-service/helpers/request";
import { OrderService } from "@/services/order-service";

export const _delete = async (id: number) => {

    const response = await Request.delete<
        OrderService.Requests.Product.Delete,
        OrderService.Responses.Product.Delete
    >({
        url: `/products/${id}`,
        options: {
            headers: {"Content-Type": 'text/plain'}
        }
    });

    return response
}