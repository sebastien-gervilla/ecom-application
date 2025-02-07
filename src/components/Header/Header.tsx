// Librairies
import { FC, useContext, useEffect } from 'react';

// Application
import './header.scss';
import { Path } from '../Breadcrumbs/Breadcrumbs.types';
import { Moon, PanelLeft, ShoppingCart, Sun } from 'lucide-react';
import { Breadcrumbs } from '../Breadcrumbs';
import { useModal, usePopover } from '@/hooks';
import { ThemeContext } from '@/contexts/ThemeContext';
import { Popover } from '../Popover';
import { Search } from '../Search';
import { Modal } from '../Modal';
import { Cart } from '../Cart';
import { ApplicationStorage, Storage } from '@/helpers/storage';

interface Props {
    path: Path;
    toggleSidebar: () => void;
}

const Header: FC<Props> = ({ path, toggleSidebar }) => {

    const modal = useModal();
    const popover = usePopover();

    const { theme, setTheme } = useContext(ThemeContext);

    const cartProducts = getCartProducts();

    const handleShowCart = () => {
        modal.openWith(
            <Cart
                onSuccess={() => {
                    modal.close();
                    Storage.set('cart', []);
                }}
                onFailure={() => { }}
                onBack={modal.close}
            />
        );
    }

    const handleGlobalSearch = () => {
        modal.openWith(
            <Search
                onClose={modal.close}
            />
        );
    }

    const handleToggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.ctrlKey) {
            if (event.key === 'g') {
                event.preventDefault();
                return handleGlobalSearch();
            }
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <header className='header'>
            <Modal {...modal} />
            <Popover
                {...popover}
                position={{
                    anchorOrigin: {
                        horizontal: 'right',
                        vertical: 'bottom'
                    },
                    bodyOrigin: {
                        horizontal: 'right',
                        vertical: 'top'
                    },
                    gap: {
                        vertical: 8
                    }
                }}
            />
            <div className="left">
                <button
                    className='icon-button'
                    onClick={toggleSidebar}
                >
                    <PanelLeft />
                </button>
                <Breadcrumbs path={path} />
            </div>
            <div className="right">
                <button
                    className="search-bar"
                    onClick={handleGlobalSearch}
                >
                    Rechercher
                </button>
                <div className="actions">
                    <button
                        className='icon-button'
                        onClick={handleToggleTheme}
                    >
                        {(
                            theme === 'dark'
                                ? <Sun />
                                : <Moon />
                        )}
                    </button>
                    <button
                        className='icon-button cart'
                        onClick={handleShowCart}
                    >
                        {cartProducts > 0 && (
                            <p className='badge'>
                                {cartProducts}
                            </p>
                        )}
                        <ShoppingCart />
                    </button>
                </div>
            </div>
        </header>
    );
}

const getCartProducts = () => {
    const cartString = Storage.get('cart');
    if (!cartString)
        return 0;

    const cart: ApplicationStorage['cart'] = JSON.parse(cartString);

    let quantity = 0;
    for (const product of cart)
        quantity += product.quantity;
    return quantity;
}

export default Header;