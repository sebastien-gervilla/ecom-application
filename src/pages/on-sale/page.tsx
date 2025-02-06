// Librairies
import { JSX } from 'react';

// Applications
import './page.scss';
import { Header, LoaderWrapper, Modal, PageLayout, Pagination, Popover } from '@/components';
import { useRequest, useLocalStorage, useModal, usePagination, usePopover } from '@/hooks';
import { orderService, OrderService } from '@/services/order-service';

const OnSaleScreen = () => {

    const [isReduced, setIsReduced] = useLocalStorage('is-sidebar-reduced', false);

    const handleToggleSidebar = () => setIsReduced(!isReduced);

    return (
        <PageLayout id='on-sale-page' isSidebarReduced={isReduced}>
            <Header
                path={[{
                    to: '/',
                    title: 'Accueil',
                    permission: null,
                }, {
                    to: '/on-sale',
                    title: 'En vente',
                    permission: OrderService.Models.User.Role.CLIENT,
                }]}
                toggleSidebar={handleToggleSidebar}
            />
            <Products />
        </PageLayout>
    );
};

const Products = () => {

    const popover = usePopover();
    const modal = useModal();

    const pagination = usePagination({
        page: 1,
        pageSize: pageSizeOptions[0],
    });

    const productsResponse = useRequest<OrderService.Responses.Product.Get>({
        request: (controller) => orderService.products.get(controller, pagination.model),
        dependencies: [pagination.model.page, pagination.model.pageSize]
    });
    const products = productsResponse.response?.is(200) ? productsResponse.response.body.data : [];
    const pages = productsResponse.response?.is(200) ? productsResponse.response.body.meta.pagination.pages : 0;

    const displayProducts = () => {
        let displayed: JSX.Element[] = [];
        for (const product of products) {
            displayed.push(
                <div
                    key={product.id}
                    className="product"
                    onClick={() => window.open(
                        `/products/${product.id}`,
                        '_blank',
                        'noreferrer'
                    )}
                >
                    <img
                        src='/product-placeholder.png'
                        alt='Placeholder'
                    />
                    <div className="informations">
                        <div className="top">
                            <p className='name'>{product.name}</p>
                            <p className='price'>{product.price}€</p>
                        </div>
                        <p className="description">
                            {product.description}
                        </p>
                    </div>
                </div>
            );
        }

        return displayed
    }

    return (
        <LoaderWrapper className='products-wrapper' isLoading={productsResponse.isLoading}>
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
                <div className="products">
                    {displayProducts()}
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

const pageSizeOptions = [50, 100, 200];

export default OnSaleScreen;