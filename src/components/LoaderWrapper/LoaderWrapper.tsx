// Librairies
import { FC, ReactNode } from 'react';

// Application
import './loader-wrapper.scss';
import Loader from '../Loader/Loader';

interface Props {
    children: ReactNode
    className?: string
    isLoading?: boolean
}

const LoaderWrapper: FC<Props> = ({ children, className, isLoading = false }) => {
    return (
        <div className={`loader-wrapper ${isLoading ? 'hide' : 'show'}` + (className ? ` ${className}` : '')}>
            {children}
            {isLoading && (
                <div className='circle'>
                    <Loader />
                </div>
            )}
        </div>
    );
}

export default LoaderWrapper;