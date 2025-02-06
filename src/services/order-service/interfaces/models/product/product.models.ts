export interface Get {
    id: number;
    name: string;
    reference: string;
    description: string;
    price: number;
    stock: number;
    url: string;
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