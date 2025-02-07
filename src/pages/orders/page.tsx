// Librairies
import { MouseEvent } from 'react';
import { CircleX, EllipsisVertical, FileText, Truck } from 'lucide-react';

// Applications
import './page.scss';
import { Confirmation, Header, LoaderWrapper, Modal, PageLayout, Pagination, Popover, Toast } from '@/components';
import { useRequest, useLocalStorage, useModal, usePagination, usePopover, useToast } from '@/hooks';
import { orderService, OrderService } from '@/services/order-service';
import { Column, DataTable } from '@/modules/data-table';
import { OrderProducts } from './components';

const OrdersScreen = () => {

    const [isReduced, setIsReduced] = useLocalStorage('is-sidebar-reduced', false);

    const handleToggleSidebar = () => setIsReduced(!isReduced);

    return (
        <PageLayout id='orders-page' isSidebarReduced={isReduced}>
            <Header
                path={[{
                    to: '/',
                    title: 'Accueil',
                    permission: null,
                }, {
                    to: '/orders',
                    title: 'Commandes',
                    permission: OrderService.Models.User.Role.ADMINISTRATOR,
                }]}
                toggleSidebar={handleToggleSidebar}
            />
            <Orders />
        </PageLayout>
    );
};

const Orders = () => {

    const toast = useToast()
    const popover = usePopover();
    const modal = useModal();

    const pagination = usePagination({
        page: 1,
        pageSize: pageSizeOptions[0],
    });

    const ordersResponse = useRequest<OrderService.Responses.Order.Get>({
        request: (controller) => orderService.orders.get(controller, pagination.model),
        dependencies: [pagination.model.page, pagination.model.pageSize]
    });
    const orders = ordersResponse.response?.is(200) ? ordersResponse.response.body.data : [];
    const pages = ordersResponse.response?.is(200) ? ordersResponse.response.body.meta.pagination.pages : 0;

    const handleOpenActionsMenu = (order: OrderService.Models.Order.Get, event: MouseEvent<HTMLButtonElement>) => {
        popover.openFrom(event.currentTarget, (
            <div className="action-menu menu">
                <button
                    className='menu-item'
                    onClick={() => handleShowOrder(order)}
                >
                    <FileText />
                    Voir les articles
                </button>
                <button
                    className='menu-item'
                    onClick={() => handleShipOrder(order)}
                >
                    <Truck />
                    Expédier la commande
                </button>
                <button
                    className='menu-item'
                    onClick={() => handleCancelOrder(order)}
                >
                    <CircleX />
                    Annuler la commande
                </button>
            </div>
        ));
    }

    const handleShowOrder = (order: OrderService.Models.Order.Get) => {
        modal.openWith(
            <OrderProducts
                order={order}
                onBack={modal.close}
            />
        );
    }

    const handleShipOrder = (order: OrderService.Models.Order.Get) => {
        modal.openWith(
            <Confirmation
                onValidate={async () => {
                    const response = await orderService.orders.ship(order.id);
                    if (response.is(204)) {
                        modal.close();
                        toast.openDefaultSuccess();
                        return ordersResponse.refresh();
                    }

                    toast.openDefaultFailure();
                }}
                onCancel={modal.close}
            />
        );
    }

    const handleCancelOrder = (order: OrderService.Models.Order.Get) => {
        modal.openWith(
            <Confirmation
                onValidate={async () => {
                    const response = await orderService.orders.cancel(order.id);
                    if (response.is(204)) {
                        modal.close();
                        toast.openDefaultSuccess();
                        return ordersResponse.refresh();
                    }

                    toast.openDefaultFailure();
                }}
                onCancel={modal.close}
            />
        );
    }

    const getStatusChip = (s: OrderService.Models.Order.Status) => {
        const status = statuses[s];
        return (
            <div className="status-chip chip">
                <p style={{ backgroundColor: status.color }}>{status.name}</p>
            </div>
        );
    }

    const columns: Column<OrderService.Models.Order.Get>[] = [
        {
            key: 'id',
            header: 'Identifiant',
            cell: ({ row }) => row.id,
        },
        {
            key: 'status',
            header: 'Statut',
            cell: ({ row }) => getStatusChip(row.status),
        },
        {
            key: 'total',
            header: 'Total',
            cell: ({ row }) => `${row.total}€`,
        },
        {
            key: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <button
                    className='icon-button'
                    onClick={(event) => handleOpenActionsMenu(row, event)}
                >
                    <EllipsisVertical />
                </button>
            ),
        },
    ];

    return (
        <LoaderWrapper className='orders-wrapper' isLoading={ordersResponse.isLoading}>
            <Popover
                {...popover}
                position={{
                    anchorOrigin: {
                        horizontal: 'right',
                        vertical: 'bottom',
                    },
                    bodyOrigin: {
                        horizontal: 'right',
                        vertical: 'top',
                    },
                    gap: {
                        vertical: 8,
                    }
                }}
            />
            <Modal {...modal} />
            <Toast {...toast} />
            <div className="content">
                <div className="header">
                    <div className="filters">

                    </div>
                </div>
                <div className="orders">
                    <DataTable
                        rows={orders}
                        columns={columns}
                        getRowId={row => row.id}
                    />
                </div>
                <div className="footer">
                    <Pagination
                        page={pagination.model.page}
                        pages={pages}
                        onChange={pagination.set}
                    />
                </div>
            </div>
        </LoaderWrapper>
    );
}

const statuses: {
    [status in OrderService.Models.Order.Status]: {
        name: string;
        color: string;
    };
} = {
    'shipped': {
        name: 'Shipped',
        color: '#9af07e'
    },
    'in_progress': {
        name: 'In progress',
        color: '#f7d2a1'
    },
    'canceled': {
        name: 'Canceled',
        color: '#f7a1a1'
    },
}

const pageSizeOptions = [50, 100, 200];

export default OrdersScreen;