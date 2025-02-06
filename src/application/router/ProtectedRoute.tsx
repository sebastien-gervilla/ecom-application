// Librairies
import { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

// Application
import { useAuthentication } from '@/hooks';

interface Props {
    loginRoutePath?: string
}

const ProtectedRoute: FC<Props> = ({ loginRoutePath = '/login' }) => {

    const { pathname } = useLocation();

    const { isAuthenticated, isLoading } = useAuthentication();

    if (isLoading)
        return <p>Loading...</p>;

    if (!isAuthenticated)
        return <Navigate to={loginRoutePath} state={{ protectedPath: pathname }} />;

    return <Outlet />;
};

export default ProtectedRoute;