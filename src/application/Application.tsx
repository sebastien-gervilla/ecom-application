// Librairies
import { FC } from 'react';

// Application
import '@/styles/index.scss';
import Router from './router/Router';
import { AuthenticationContextProvider } from '@/contexts/AuthenticationContext';
import { ThemeContextProvider } from '@/contexts/ThemeContext';
import { CartContextProvider } from '@/contexts/CartContext';

const Application: FC = () => {
    return (
        <div className='application'>
            <ThemeContextProvider>
                <AuthenticationContextProvider>
                    <CartContextProvider>
                        <Router />
                    </CartContextProvider>
                </AuthenticationContextProvider>
            </ThemeContextProvider>
        </div>
    );
}

export default Application;