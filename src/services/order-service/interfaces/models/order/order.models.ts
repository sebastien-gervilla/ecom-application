import { Models } from "@/services/order-service/interfaces";

export interface Get {
    id: number;
    products: Models.OrderProduct.Get[];
    status: Status;
}

export interface Create {
    id: number;
    quantity: number;
}

export enum Status {
    IN_PROGRESS = 'in_progress',
    SHIPPED = 'shipped',
    CANCELED = 'canceled'
}