// Librairies
import { FC } from 'react';
import { LoaderCircle } from 'lucide-react';

// Application
import './loader.scss';

interface Props {
    usePageHeight?: boolean
    size?: number
}

const Loader: FC<Props> = ({ usePageHeight = false, size = 40 }) => {
    return (
        <div className='loader' style={{
            height: usePageHeight
                ? '100vh'
                : '100%'
        }}>
            <LoaderCircle
                size={size}
            />
        </div>
    );
};

export default Loader;