import { Page, publicRoutes } from '@/application/router/router.types';
import { Request as RequestHelper } from '@/helpers/request';
import { HttpResponses, RequestOptions } from '@/helpers/request/request.types';
import { Response } from '@/helpers/request/response';

export class Request extends RequestHelper {

    public static target = import.meta.env.VITE_ORDER_SERVICE_URL;

    public static getDefaultOptions = (): RequestOptions => {
        return {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    }

    protected static onSuccess = <Responses extends HttpResponses>(response: Response<Responses>) => {
        if (
            response.status === 401 &&
            !publicRoutes.includes(window.location.pathname) &&
            !window.location.pathname.startsWith('/register')
        )
            window.location.href = Page.Login;
    };

}