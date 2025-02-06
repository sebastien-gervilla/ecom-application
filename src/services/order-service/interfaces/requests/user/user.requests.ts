import { HttpRequest } from "@/helpers/request/request.types";
import { Models } from "@/services/order-service/interfaces";

export interface Login extends HttpRequest {
    body: Models.User.Login;
}

export interface Logout extends HttpRequest { }

export interface Register extends HttpRequest {
    body: Models.User.Register;
}

export interface Get extends HttpRequest {
    query: {
        page: number;
        pageSize: number;
    };
}

export interface GetById extends HttpRequest { }

export interface Current extends HttpRequest { }

export interface VerificationAccount extends HttpRequest { }