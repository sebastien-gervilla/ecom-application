import { Models } from "@/services/order-service/interfaces";

export interface Get {
    id: number;
    products: Models.Product.Get[];
    status: Status;
}

export interface Create {
    name: string;
    reference: string;
    description: string;
    price: number;
    stock: number;
    url: string;
}

export interface Put {
    name: string;
    reference: string;
    description: string;
    price: number;
    stock: number;
    url: string;
}

export enum Status {
    IN_PROGRESS = 'in_progress',
    SHIPPED = 'shipped',
    CANCELED = 'canceled'
}