// Librairies
import { useAuthentication, useModal, usePopover } from '@/hooks';
import { FC, MouseEvent, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
    ChartArea,
    Coffee, Command, FileText,
    House, LogOut, Logs, MoveRight, Tag, User, Users
} from 'lucide-react';

// Application
import './sidebar.scss';
import { OrderService } from '@/services/order-service';
import { Modal, Popover } from '@/components';

interface Props {
    isReduced: boolean;
}

const Sidebar: FC<Props> = ({ isReduced }) => {

    const { user, logout } = useAuthentication<'protected'>();

    const modal = useModal();
    const popover = usePopover();

    const getNavigation = (navigationTabs: Tabs) => {
        return navigationTabs.map(tab => {
            const label = !isReduced
                ? tab.name
                : undefined;

            const hasPermission = !tab.requiresAdministrator || user.role === OrderService.Models.User.Role.ADMINISTRATOR;

            if (!hasPermission) return (
                <p
                    key={tab.path}
                    className='menu-item disabled'
                >
                    {tab.icon}
                    {label}
                </p>
            );

            return (
                <Link
                    key={tab.path}
                    to={tab.path}
                    className='menu-item'
                >
                    {tab.icon}
                    {label}
                </Link>
            );
        });
    }

    const handleShowShortcuts = () => {
        modal.openWith(
            <div className="shortcuts">
                <h4>Raccourcis</h4>
                <div className="shortcut">
                    <div className='key'>
                        <p>CTRL</p>
                    </div>
                    <div className='key'>
                        <p>G</p>
                    </div>
                    <MoveRight />
                    <p>Recherche globale</p>
                </div>
                <div className="shortcut">
                    <div className='key'>
                        <p>CTRL</p>
                    </div>
                    <div className='key'>
                        <p>B</p>
                    </div>
                    <MoveRight />
                    <p>Naviguer vers une référence</p>
                </div>
            </div>
        );
    }

    const handleOpenUserMenu = ({ currentTarget }: MouseEvent<HTMLElement>) => {
        popover.openFrom(currentTarget, (
            <div className="user-menu menu">
                <button key='shortcuts' className="item" onClick={handleShowShortcuts}>
                    <Command />
                    <p>Raccourcis</p>
                </button>
                <button key='logout' className="item" onClick={logout}>
                    <LogOut />
                    <p>Déconnexion</p>
                </button>
            </div>
        ));
    }

    const displayUser = () => {
        if (!isReduced) return (
            <div
                role='button'
                tabIndex={1}
                className="user"
                onClick={handleOpenUserMenu}
            >
                <div className="informations">
                    <p className='name'>
                        {user.firstName} {user.lastName}
                    </p>
                    <p className='role'>
                        {user.role}
                    </p>
                </div>
                <User />
            </div>
        );

        return (
            <button
                className='icon-button'
                onClick={handleOpenUserMenu}
            >
                <User />
            </button>
        )
    }

    const showParameters = user.role === OrderService.Models.User.Role.ADMINISTRATOR;

    return (
        <div className={'sidebar ' + (isReduced ? 'reduced' : 'full')}>
            <Modal {...modal} />
            <Popover
                {...popover}
                position={{
                    anchorOrigin: {
                        vertical: 'bottom'
                    },
                    bodyOrigin: {
                        vertical: 'bottom'
                    },
                    gap: {
                        horizontal: 8
                    }
                }}
            />
            <div className="brand">
                {!isReduced ? (
                    <>
                        <p className='application-name'>ECOM</p>
                        <p className='company'>E-Commerce</p>
                    </>
                ) : <Coffee />}
            </div>
            <div className="content">
                <section className='navigation'>
                    {!isReduced && (
                        <p className='title'>
                            Panel client
                        </p>
                    )}
                    <ul>
                        {getNavigation(clientTabs)}
                    </ul>
                </section>
                {showParameters && (
                    <section className='navigation'>
                        {!isReduced && (
                            <p className='title'>
                                Administration
                            </p>
                        )}
                        <ul>
                            {getNavigation(administrationTabs)}
                        </ul>
                    </section>
                )}
            </div>
            <div className="footer">
                {displayUser()}
            </div>
        </div>
    );
}

type Tabs = {
    name: string;
    path: string;
    icon: ReactNode;
    requiresAdministrator?: boolean;
}[];

const clientTabs: Tabs = [
    {
        path: '/',
        name: 'Accueil',
        icon: <House />,
    },
    {
        path: '/on-sale',
        name: 'En vente',
        icon: <Tag />,
    },
    {
        path: '/my-orders',
        name: 'Mes commandes',
        icon: <Logs />,
    },
];

const administrationTabs: Tabs = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        icon: <ChartArea />,
        requiresAdministrator: true,
    },
    {
        path: '/products',
        name: 'Produits',
        icon: <FileText />,
        requiresAdministrator: true,
    },
    {
        path: '/orders',
        name: 'Commandes',
        icon: <Logs />,
        requiresAdministrator: true,
    },
    {
        path: '/users',
        name: 'Utilisateurs',
        icon: <Users />,
        requiresAdministrator: true,
    },
];

export default Sidebar;