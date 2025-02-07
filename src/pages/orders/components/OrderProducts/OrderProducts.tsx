// Librairies
import { FC } from 'react';

// Application
import './order-products.scss';
import { OrderService } from '@/services/order-service';
import { Column, DataTable } from '@/modules/data-table';

interface Props {
    order: OrderService.Models.Order.Get;
    onBack: () => void;
}

type OrderProduct = OrderService.Models.Order.Get['products'][number];

const OrderProducts: FC<Props> = ({ order, onBack }) => {

    const total = order.products.reduce((a, b) => a + b.price * b.quantity, 0);

    const columns: Column<OrderProduct>[] = [
        {
            key: 'name',
            header: 'Nom',
            cell: ({ row }) => row.name,
        },
        {
            key: 'description',
            header: 'Description',
            cell: ({ row }) => row.description,
        },
        {
            key: 'quantity',
            header: 'Quantité',
            cell: ({ row }) => row.quantity,
        },
        {
            key: 'price',
            header: 'Price',
            cell: ({ row }) => `${row.price}€`,
        },
        {
            key: 'total',
            header: 'Total',
            cell: ({ row }) => `${row.price * row.quantity}€`,
        },
    ];

    return (
        <div className='order-products'>
            <h2>Produits</h2>
            <div className="products">
                <DataTable
                    rows={order.products}
                    columns={columns}
                    getRowId={row => row.id}
                />
            </div>
            <div className="order-total">
                <p>Total de la commande</p>
                <p>{total}€</p>
            </div>
            <div className="footer">
                <button
                    className='animated text ghost'
                    onClick={onBack}
                >
                    Retour
                </button>
            </div>
        </div>
    );
}

export default OrderProducts;