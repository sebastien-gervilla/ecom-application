// Librairies
import { FC, ReactNode } from 'react';

// Application
import './alert.scss';

interface Props {
    children: ReactNode;
    variant: AlertVariant;
    filled?: boolean;
}

const Alert: FC<Props> = ({ children, variant, filled = false }) => {
    return (
        <div
            role='alert'
            className={`alert ${variant}` + (filled ? ' filled' : '')}
        >
            {children}
        </div>
    );
}

export type AlertVariant =
    | 'positive'
    | 'destructive'

export default Alert;