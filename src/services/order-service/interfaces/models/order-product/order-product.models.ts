import { Models } from "@/services/order-service/interfaces";

export interface Get {
    quantity: number;
    product: Models.Product.Get;
    order: Models.Order.Get;
}