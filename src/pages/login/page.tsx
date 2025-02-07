// Libraries
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Coffee, Eye, EyeOff } from 'lucide-react';

// Application
import './page.scss';
import { OrderService } from '@/services/order-service';
import { Loader } from '@/components';
import { Form, FormHandler } from '@/modules/form';
import { Page } from '@/application/router/router.types';
import { Alert } from '@/components/Alert';
import { useAuthentication } from '@/hooks';

const LoginScreen = () => {
    return (
        <Login />
    );
}

const Login = () => {

    const { login } = useAuthentication();

    const navigate = useNavigate();
    const { state } = useLocation();

    const [form, setForm] = useState(defaultLoginForm);

    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChanges: FormHandler<ValueOf<OrderService.Models.User.Login>> = ({ name, value }) => {
        setForm(current => ({
            ...current,
            [name]: value
        }));
    }

    const handleToggleShowPassword = () => setShowPassword(current => !current);

    const handleLogin = async () => {
        setIsLoading(true);
        const success = await login(form.email, form.password);

        if (!success) {
            setError('Identifiants invalides')
            return setIsLoading(false);
        };

        setIsLoading(false);
        navigate(state?.protectedPath || Page.Home);
    }

    if (isLoading)
        return <Loader usePageHeight />;

    return (
        <section id='login-page'>
            <div className="left">
                <div className="application-name">
                    <Coffee />
                    <p>E-Commerce</p>
                </div>
            </div>
            <div className="right">
                <div className="form">
                    <h1>
                        Se connecter
                    </h1>
                    <Form.Field
                        label='Email'
                        name='email'
                        value={form.email}
                        onChange={handleChanges}
                    />
                    <Form.Field
                        label='Mot de passe'
                        name='password'
                        value={form.password}
                        onChange={handleChanges}
                        type={showPassword ? 'text' : 'password'}
                        endElement={(
                            <button
                                className='icon-button'
                                onClick={handleToggleShowPassword}
                            >
                                {showPassword ? <EyeOff /> : <Eye />}
                            </button>
                        )}
                    />
                    {!!error && (
                        <Alert variant='destructive'>
                            <p>{error}</p>
                        </Alert>
                    )}
                    <button
                        className='animated'
                        onClick={handleLogin}
                    >
                        Se connecter
                    </button>
                    <p style={{ display: 'flex', gap: 8 }}>
                        Pas encore inscrit ? <Link to='/register' style={{ textDecoration: 'underline' }}>Créer un compte</Link>
                    </p>
                </div>
            </div>
        </section>
    )
};

const defaultLoginForm: OrderService.Models.User.Login = {
    email: '',
    password: ''
}

export default LoginScreen;