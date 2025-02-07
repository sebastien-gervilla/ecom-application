// Librairies
import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Application
import {
    Home, Login, OnSale, MyOrders, Products, Orders, Register, Users
} from '@/pages';
import { Page } from './router.types';
import ProtectedRoute from './ProtectedRoute';

const Router: FC = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path={Page.Login} element={<Login />} />
                <Route path={Page.Register} element={<Register />} />

                <Route element={<ProtectedRoute />}>
                    <Route path={Page.Home} element={<Home />} />

                    <Route path={Page.OnSale} element={<OnSale />} />
                    <Route path={Page.MyOrders} element={<MyOrders />} />

                    <Route path={Page.Products} element={<Products />} />
                    <Route path={Page.Orders} element={<Orders />} />
                    <Route path={Page.Users} element={<Users />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default Router;