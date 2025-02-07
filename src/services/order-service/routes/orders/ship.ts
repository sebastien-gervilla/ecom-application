import { Request } from "@/services/order-service/helpers/request";
import { OrderService } from "@/services/order-service";

export const ship = async (orderId: number) => {

    const response = await Request.patch<
        OrderService.Requests.Order.Ship,
        OrderService.Responses.Order.Ship
    >({
        url: `/orders/${orderId}/ship`,
        options: {
            headers: {"Content-Type": 'text/plain'}
        }
    });

    return response
}