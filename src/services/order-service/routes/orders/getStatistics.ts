import { Request } from "@/services/order-service/helpers/request";
import { OrderService } from "@/services/order-service";

export const getStatistics = async (controller: AbortController) => {

    const response = await Request.get<
        OrderService.Requests.Order.GetStatistics,
        OrderService.Responses.Order.GetStatistics
    >({
        url: '/orders/statistics',
        options: {
            signal: controller.signal
        }
    });

    return response
}