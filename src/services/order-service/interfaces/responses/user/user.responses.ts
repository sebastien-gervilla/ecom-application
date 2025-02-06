import { HttpResponses } from "@/helpers/request/request.types";
import { Models } from "@/services/order-service/interfaces";

export interface Get extends HttpResponses {
    200: {
        data: Models.User.Get[];
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

export interface GetById extends HttpResponses {
    200: {
        data: Models.User.Get
    }
}

export interface Post extends HttpResponses {
    201: never;
    409: {
        error: string;
    }
}

export interface Patch extends HttpResponses {
    204: never;
    409: {
        error: string;
    }
}

export interface ChangePassword extends HttpResponses {
    204: never;
    409: {
        error: string;
    }
}

export interface Delete extends HttpResponses {
    204: never;
    404: never;
}

// /users/current
export interface Current extends HttpResponses {
    200: {
        data: Models.User.Current;
    };
    201: {
        data: number;
    };
    400: {
        errors: [];
    };
    404: {
        data: string;
    }
}

export interface Register extends HttpResponses {
    201: {
        data: {
            token: string
        };
    };
    400: {
        data: string;
    };
}

export interface Login extends HttpResponses {
    204: {
        data: {
            token: string
        };
    };
    400: {
        data: string;
    };
    404: {
        data: string;
    }
}

export interface Logout extends HttpResponses {
    204: never;
}
