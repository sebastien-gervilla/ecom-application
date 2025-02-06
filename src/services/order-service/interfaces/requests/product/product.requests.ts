import { HttpRequest } from "@/helpers/request/request.types";
import { Models } from "@/services/order-service/interfaces";

export interface Get extends HttpRequest {
    query: {
        page: number;
        pageSize: number;
    };
}

export interface Post extends HttpRequest {
    body: Models.Product.Create;
}

export interface Put extends HttpRequest {
    body: Models.Product.Put;
}

export interface Delete extends HttpRequest { }

export interface Search extends HttpRequest {
    query: {
        value: string;
    };
}