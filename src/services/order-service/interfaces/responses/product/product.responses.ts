import { HttpResponses } from "@/helpers/request/request.types";
import { Models } from "@/services/order-service/interfaces";

export interface Get extends HttpResponses {
    200: {
        data: Models.Product.Get[];
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

export interface Put extends HttpResponses {
    204: never;
    409: {
        error: string;
    }
}

export interface Delete extends HttpResponses {
    204: never;
    409: {
        error: string;
    }
}

export interface Search extends HttpResponses {
    200: {
        data: Models.Product.Get[];
    };
    409: {
        error: string;
    }
}