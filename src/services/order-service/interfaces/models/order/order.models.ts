export interface Get {
    id: number;
    products: {
        id: number;
        name: string;
        reference: string;
        description: string;
        price: number;
        stock: number;
        url: string;
        quantity: number;
    }[];
    status: Status;
    total: number;
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