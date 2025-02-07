// Librairies
import { FC, useState } from 'react';

// Application
import './product-sheet.scss';
import { OrderService } from '@/services/order-service';
import { Form } from '@/modules/form';
import { ApplicationStorage, Storage } from '@/helpers/storage';

interface Props {
    product: OrderService.Models.Product.Get;
}

const ProductSheet: FC<Props> = ({ product }) => {

    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        const addedProduct = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity,
        };

        const currentCartString = Storage.get('cart');
        if (!currentCartString)
            return Storage.set('cart', [addedProduct])

        const currentCart: ApplicationStorage['cart'] = JSON.parse(currentCartString);
        const cartProduct = currentCart.find(p => p.id === product.id);
        if (!cartProduct)
            currentCart.push(addedProduct);
        else
            cartProduct.quantity = addedProduct.quantity;

        Storage.set('cart', currentCart);
    }

    return (
        <div className='product-sheet'>
            <img
                src='/product-placeholder.png'
                alt='Product placeholder'
            />
            <div className="informations">
                <p className='name'>{product.name}</p>
                <p className='price'>{product.price}€</p>
                <p className='description'>{product.description}</p>
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