export enum Page {
    // Public
    Login = '/login',
    Register = '/register',

    // Protected
    Home = '/',

    OnSale = '/on-sale',

    Orders = '/orders',
    Products = '/products',
    Users = '/users',
}

export const publicRoutes: string[] = [Page.Login, Page.Register];