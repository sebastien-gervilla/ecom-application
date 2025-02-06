// Librairies
import { FC, ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

// Application
import './snackbar.scss';

interface Props {
    isOpened: boolean;
    body: ReactNode;
    onClose: () => void;
    duration?: number;
    className?: string;
}

const Snackbar: FC<Props> = ({ isOpened, body, onClose, duration = 6000, className }) => {

    const timeoutReference = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        timeoutReference.current = setTimeout(() => onClose(), duration);

        return () => {
            if (timeoutReference.current)
                clearTimeout(timeoutReference.current);
        };
    }, [isOpened, duration]);

    return isOpened && createPortal((
        <div className={'snackbar' + (className ? className : '')}>
            {body}
        </div>
    ), document.body);
};

export default Snackbar;