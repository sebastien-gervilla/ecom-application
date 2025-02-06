// Librairies
import { Form, FormHandler } from '@/modules/form';
import { OrderService } from '@/services/order-service';
import { FC, useState } from 'react';

interface Props<T extends OrderService.Models.Product.Create> {
    initialForm: T;
    onSubmit: (form: T) => void;
}

const ProductForm: FC<Props<OrderService.Models.Product.Create>> = <T extends OrderService.Models.Product.Create>({
    initialForm,
    onSubmit,
}: Props<T>) => {

    const [form, setForm] = useState(initialForm);

    const handleChanges: FormHandler<ValueOf<OrderService.Models.Product.Create>> = ({ name, value }) => {
        setForm(current => ({
            ...current,
            [name]: value,
        }));
    }

    const handleSubmit = () => onSubmit(form);

    return (
        <div className='product-form form'>
            <h3>Produit</h3>
            <div className="row">
                <Form.Field
                    label='Nom'
                    name='name'
                    value={form.name}
                    onChange={handleChanges}
                />
                <Form.Field
                    label='Référence'
                    name='reference'
                    value={form.reference}
                    onChange={handleChanges}
                />
            </div>
            <div className="row">
                <Form.Field
                    label='Description'
                    name='description'
                    value={form.description}
                    onChange={handleChanges}
                />
            </div>
            <div className="row">
                <Form.NumberField
                    label='Prix'
                    name='price'
                    value={form.price}
                    onChange={handleChanges}
                />
                <Form.NumberField
                    label='Stock'
                    name='stock'
                    value={form.stock}
                    onChange={handleChanges}
                />
            </div>
            <div className="row">
                <Form.Field
                    label="Url de l'image"
                    name='url'
                    value={form.url}
                    onChange={handleChanges}
                />
            </div>
            <button
                className='animated'
                onClick={handleSubmit}
            >
                Valider
            </button>
        </div>
    );
}

export default ProductForm;