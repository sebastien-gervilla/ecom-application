// Librairies
import { FC } from 'react';

// Application
import './cart.scss';
import { ApplicationStorage, Storage } from '@/helpers/storage';
import { orderService } from '@/services/order-service';

interface Props {
    onSuccess: () => void;
    onFailure: () => void;
    onBack: () => void;
}

const Cart: FC<Props> = ({ onSuccess, onFailure, onBack }) => {

    const products = getCartProducts();
    const total = products.reduce((a, b) => a + b.price * b.quantity, 0);

    const handleOrder = async () => {
        const response = await orderService.orders.create(products);
        return response.is(201)
            ? onSuccess()
            : onFailure();
    }

    const displayProducts = () => {
        return products.map(product => (
            <div key={product.id} className="product">
                <p className='name'>{product.name}</p>
                <p className='quantity'>{product.quantity}</p>
                <p className='price'>{product.price}€</p>
                <p className='total'>{product.price * product.quantity}€</p>
            </div>
        ));
    }

    return (
        <div className='cart'>
            <h2>Votre panier</h2>
            <div className="products">
                <div className="header">
                    <p className='name'>Nom</p>
                    <p className='quantity'>Quantité</p>
                    <p className='price'>Prix</p>
                    <p className='total'>Total</p>
                </div>
                {displayProducts()}
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
                <button
                    className='animated'
                    onClick={handleOrder}
                >
                    Passer commande
                </button>
            </div>
        </div>
    );
}

const getCartProducts = (): ApplicationStorage['cart'] => {
    const cartString = Storage.get('cart');
    if (!cartString)
        return [];

    const cart: ApplicationStorage['cart'] = JSON.parse(cartString);

    return cart;
}

export default Cart;