import { Request } from "@/services/order-service/helpers/request";
import { OrderService } from "@/services/order-service";

export const cancel = async (orderId: number) => {

    const response = await Request.patch<
        OrderService.Requests.Order.Cancel,
        OrderService.Responses.Order.Cancel
    >({
        url: `/orders/${orderId}/cancel`,
        options: {
            headers: {"Content-Type": 'text/plain'}
        }
    });

    return response
}