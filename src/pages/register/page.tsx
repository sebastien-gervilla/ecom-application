// Librairies
import { FC, useState } from 'react';

// Application
import './page.scss';
import { Form, FormHandler } from '@/modules/form';
import { OrderService, orderService } from '@/services/order-service';
import { Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';

const RegisterPage: FC = () => {

    const [form, setForm] = useState(defaultForm);
    const [error, setError] = useState('');

    const handleChanges: FormHandler<ValueOf<OrderService.Models.User.Register>> = ({ name, value }) => {
        setForm(current => ({
            ...current,
            [name]: value,
        }));
    }

    const handleSubmit = async () => {

        const response = await orderService.users.register(form);

        if (response.is(201))
            return window.location.pathname = '/';

        if (response.is(400))
            return setError(response.body.data);
    };

    return (
        <section id="register-page">
            <div className="left">
                <div className="application-name">
                    <Coffee />
                    <p>E-Commerce</p>
                </div>
            </div>
            <div className="right">
                <div className="form">
                    <h1>Créer un compte</h1>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div className="row">
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
                    </div>
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
                    <button
                        type="submit"
                        className='animated pixelated-small'
                        onClick={handleSubmit}
                    >
                        Validate
                    </button>
                    <p style={{ display: 'flex', gap: 8 }}>
                        Déjà inscrit ? <Link to='/login' style={{ textDecoration: 'underline' }}>Se connecter</Link>
                    </p>
                </div>
            </div>
        </section>
    );
}

const defaultForm: OrderService.Models.User.Register = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
};

export default RegisterPage;
