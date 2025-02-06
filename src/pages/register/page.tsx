// Librairies
import { FC, useState } from 'react';

// Application
import './page.scss';
import { PageLayout } from '@/components';
import { Form, FormHandler } from '@/modules/form';
import { OrderService, orderService } from '@/services/order-service';

const RegisterPage: FC = () => {

    const [form, setForm] = useState(defaultForm);
    const [error, setError] = useState('');

    const [isAccountCreated, setIsAccountCreated] = useState(false);

    const handleChanges: FormHandler<ValueOf<OrderService.Models.User.Register>> = ({ name, value }) => {
        setForm(current => ({
            ...current,
            [name]: value,
        }));
    }

    const handleSubmit = async () => {

        const response = await orderService.users.register(form);

        if (response.is(201))
            return setIsAccountCreated(true);

        if (response.is(400))
            return setError(response.body.data);
    };

    return (
        <PageLayout id="register-page">
            <div className="overlay">
                <div className="menu">
                    <div className="body">
                        <div className="form">
                            <h1>Créer un compte</h1>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <Form.Field
                                label='Prénom'
                                name='firstName'
                                value={form.firstName}
                                onChange={handleChanges}
                            />
                            <Form.Field
                                label='Nom'
                                name='lastName'
                                value={form.lastName}
                                onChange={handleChanges}
                            />
                            <Form.Field
                                label='Email'
                                name='email'
                                value={form.email}
                                onChange={handleChanges}
                            />
                            <Form.Field
                                label='Mot de passe'
                                name='password'
                                type='password'
                                value={form.password}
                                onChange={handleChanges}
                            />
                            {isAccountCreated
                                ? 'Account successfully created, confirm your account by checking your email'
                                : null
                            }
                            <button
                                type="submit"
                                className='animated pixelated-small'
                                onClick={handleSubmit}
                            >
                                Validate
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}

const defaultForm: OrderService.Models.User.Register = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
};

export default RegisterPage;
