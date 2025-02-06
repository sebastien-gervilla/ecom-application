// Librairies

// Applications
import './page.scss';
import { Header, LoaderWrapper, Modal, PageLayout, Pagination, Popover } from '@/components';
import { useRequest, useLocalStorage, useModal, usePagination, usePopover } from '@/hooks';
import { orderService, OrderService } from '@/services/order-service';
import { UsersTable } from './components/UsersTable';

const UsersScreen = () => {

    const [isReduced, setIsReduced] = useLocalStorage('is-sidebar-reduced', false);

    const handleToggleSidebar = () => setIsReduced(!isReduced);

    return (
        <PageLayout id='users-page' isSidebarReduced={isReduced}>
            <Header
                path={[{
                    to: '/',
                    title: 'Accueil',
                    permission: null,
                }, {
                    to: '/users',
                    title: 'Users',
                    permission: OrderService.Models.User.Role.ADMINISTRATOR,
                }]}
                toggleSidebar={handleToggleSidebar}
            />
            <Users />
        </PageLayout>
    );
};

const Users = () => {

    const popover = usePopover();
    const modal = useModal();

    const pagination = usePagination({
        page: 1,
        pageSize: pageSizeOptions[0],
    });

    const usersResponse = useRequest<OrderService.Responses.User.Get>({
        request: (controller) => orderService.users.get(controller, pagination.model),
        dependencies: [pagination.model.page, pagination.model.pageSize]
    });
    const users = usersResponse.response?.is(200) ? usersResponse.response.body.data : [];
    const pages = usersResponse.response?.is(200) ? usersResponse.response.body.meta.pagination.pages : 0;

    const handleActionClick = (_: OrderService.Models.User.Get) => {

    }

    return (
        <LoaderWrapper className='users' isLoading={usersResponse.isLoading}>
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
            <div className="content">
                <div className="header">
                    <div className="filters">

                    </div>
                </div>
                <UsersTable
                    rows={users}
                    onActionClick={handleActionClick}
                />
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

const pageSizeOptions = [50, 100, 200];

export default UsersScreen;