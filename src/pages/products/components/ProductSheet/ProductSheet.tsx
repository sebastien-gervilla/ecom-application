// Librairies
import { FC, useState } from 'react';

// Application
import './product-sheet.scss';
import { OrderService } from '@/services/order-service';
import { Form } from '@/modules/form';
import { useCart } from '@/hooks';

interface Props {
    product: OrderService.Models.Product.Get;
    onBack: () => void;
}

const ProductSheet: FC<Props> = ({ product, onBack }) => {

    const { cart, setCart } = useCart();

    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        const addedProduct = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity,
        };

        const cartProduct = cart.find(p => p.id === product.id);
        if (!cartProduct)
            cart.push(addedProduct);
        else
            cartProduct.quantity = addedProduct.quantity;

        setCart([...cart]);
    }

    return (
        <div className='product-sheet'>
            <div className="sheet">
                <img
                    src='/product-placeholder.png'
                    alt='Product placeholder'
                />
                <div className="informations">
                    <p className='name'>{product.name}</p>
                    <p className='price'>{product.price}€</p>
                    <p className='description'>{product.description}</p>
                </div>
            </div>
            <div className="footer">
                <button
                    className='animated text ghost'
                    onClick={onBack}
                >
                    Retour
                </button>
                <div className="actions">
                    <Form.NumberField
                        name='quantity'
                        value={quantity}
                        onChange={({ value }) => value > 1 && setQuantity(value)}
                    />
                    <button
                        className='animated'
                        onClick={handleAddToCart}
                    >
                        Ajouter au panier
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductSheet;