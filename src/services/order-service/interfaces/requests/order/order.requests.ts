import { HttpRequest } from "@/helpers/request/request.types";
import { Models } from "@/services/order-service/interfaces";

export interface Get extends HttpRequest {
    query: {
        page: number;
        pageSize: number;
    };
}

export interface GetStatistics extends HttpRequest { }

export interface Post extends HttpRequest {
    body: Models.Order.Create[];
}

export interface Ship extends HttpRequest { }

export interface Cancel extends HttpRequest { }