// Librairies
import { FC } from 'react';

// Application
import './cart.scss';
import { orderService } from '@/services/order-service';
import { useCart } from '@/hooks';
import { CircleX, Minus, Plus } from 'lucide-react';

interface Props {
    onSuccess: () => void;
    onFailure: () => void;
    onBack: () => void;
}

const Cart: FC<Props> = ({ onSuccess, onFailure, onBack }) => {

    const { cart, setCart } = useCart();

    const total = cart.reduce((a, b) => a + b.price * b.quantity, 0);

    const handleOrder = async () => {
        const response = await orderService.orders.create(cart);
        return response.is(201)
            ? onSuccess()
            : onFailure();
    }

    const handleChangeProductQuantity = (product: (typeof cart)[number], newQuantity: number) => {
        if (newQuantity <= 0)
            return;

        setCart(
            cart.map(
                p => p.id === product.id
                    ? { ...p, quantity: newQuantity }
                    : p
            )
        )
    }

    const handleRemoveProduct = (product: (typeof cart)[number]) => {
        setCart(cart.filter(p => p.id !== product.id));
    }

    const displayProducts = () => {
        return cart.map(product => (
            <div key={product.id} className="product">
                <p className='name'>{product.name}</p>
                <p className='quantity'>{product.quantity}</p>
                <p className='price'>{product.price}€</p>
                <p className='total'>{product.price * product.quantity}€</p>
                <div className="product-actions">
                    <button
                        className='icon-button'
                        onClick={() => handleChangeProductQuantity(product, product.quantity + 1)}
                    >
                        <Plus />
                    </button>
                    <button
                        className='icon-button'
                        onClick={() => handleChangeProductQuantity(product, product.quantity - 1)}
                    >
                        <Minus />
                    </button>
                    <button
                        className='icon-button destructive'
                        onClick={() => handleRemoveProduct(product)}
                    >
                        <CircleX />
                    </button>
                </div>
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
                {cart.length ? displayProducts() : (
                    <div className="product">
                        <p>Panier vide</p>
                    </div>
                )}
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

export default Cart;