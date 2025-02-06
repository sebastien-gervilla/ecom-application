// Librairies

// Applications
import './page.scss';
import { Confirmation, Header, LoaderWrapper, Modal, PageLayout, Pagination, Popover } from '@/components';
import { useRequest, useLocalStorage, useModal, usePagination, usePopover } from '@/hooks';
import { orderService, OrderService } from '@/services/order-service';
import { Column, DataTable } from '@/modules/data-table';
import { EllipsisVertical, PencilIcon, Trash2 } from 'lucide-react';
import { MouseEvent } from 'react';
import { ProductForm } from './components';

const ProductsScreen = () => {

    const [isReduced, setIsReduced] = useLocalStorage('is-sidebar-reduced', false);

    const handleToggleSidebar = () => setIsReduced(!isReduced);

    return (
        <PageLayout id='products-page' isSidebarReduced={isReduced}>
            <Header
                path={[{
                    to: '/',
                    title: 'Accueil',
                    permission: null,
                }, {
                    to: '/products',
                    title: 'Produits',
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

    const handleOpenActionsMenu = (product: OrderService.Models.Product.Get, event: MouseEvent<HTMLButtonElement>) => {
        popover.openFrom(event.currentTarget, (
            <div className="action-menu menu">
                <button
                    className='menu-item'
                    onClick={() => handleEditProduct(product)}
                >
                    <PencilIcon />
                    Modifier
                </button>
                <button
                    className='menu-item'
                    onClick={() => handleDeleteProduct(product)}
                >
                    <Trash2 />
                    Supprimer
                </button>
            </div>
        ));
    }

    const handleNewProduct = () => {
        modal.openWith(
            <ProductForm
                initialForm={defaultProduct}
                onSubmit={async (form) => {
                    const response = await orderService.products.create(form);
                    if (response.is(201)) {
                        modal.close();
                        return productsResponse.refresh();
                    }
                }}
            />
        );
    }

    const handleEditProduct = (product: OrderService.Models.Product.Get) => {
        modal.openWith(
            <ProductForm
                initialForm={product}
                onSubmit={async (form) => {
                    const response = await orderService.products.update(product.id, form);
                    if (response.is(204)) {
                        modal.close();
                        return productsResponse.refresh();
                    }
                }}
            />
        );
    }

    const handleDeleteProduct = (product: OrderService.Models.Product.Get) => {
        modal.openWith(
            <Confirmation
                onValidate={async () => {
                    const response = await orderService.products.delete(product.id);
                    if (response.is(204)) {
                        modal.close();
                        return productsResponse.refresh();
                    }
                }}
                onCancel={modal.close}
            />
        );
    }

    const columns: Column<OrderService.Models.Product.Get>[] = [
        {
            key: 'name',
            header: 'Nom',
            cell: ({ row }) => row.name,
        },
        {
            key: 'reference',
            header: 'Référence',
            cell: ({ row }) => row.reference,
        },
        {
            key: 'description',
            header: 'Description',
            cell: ({ row }) => row.description,
        },
        {
            key: 'price',
            header: 'Price',
            cell: ({ row }) => row.price,
        },
        {
            key: 'stock',
            header: 'Stock',
            cell: ({ row }) => row.stock,
        },
        {
            key: 'stock',
            header: 'Stock',
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
                    <button
                        className='animated'
                        onClick={handleNewProduct}
                    >
                        Nouveau produit
                    </button>
                </div>
                <div className="products">
                    <DataTable
                        rows={products}
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

const pageSizeOptions = [50, 100, 200];

const defaultProduct: OrderService.Models.Product.Create = {
    name: '',
    reference: '',
    description: '',
    price: 0,
    stock: 0,
    url: '',
}

export default ProductsScreen;