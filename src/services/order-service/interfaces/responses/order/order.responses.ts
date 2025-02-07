import { HttpResponses } from "@/helpers/request/request.types";
import { Models } from "@/services/order-service/interfaces";

export interface Get extends HttpResponses {
    200: {
        data: Models.Order.Get[];
        meta: {
            pagination: {
                pageSize: number;
                page: number;
                pages: number;
                totalRecords: number;
            }
        }
    };
    400: {
        errors: []
    }
}

export interface Post extends HttpResponses {
    201: never;
    409: {
        error: string;
    }
}

export interface Ship extends HttpResponses {
    204: never;
    409: {
        error: string;
    }
}

export interface Cancel extends HttpResponses {
    204: never;
    409: {
        error: string;
    }
}