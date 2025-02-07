// Librairies
import { FC, useEffect, useRef, useState } from 'react';
import { SearchIcon, X } from 'lucide-react';

// Application
import './search.scss';
import { useModal, useRequest } from '@/hooks';
import { orderService, OrderService } from '@/services/order-service';
import { ProductSheet } from '@/pages/products/components';
import { Modal } from '../Modal';

interface Props {
    onClose: () => void;
}

const Search: FC<Props> = ({ onClose }) => {

    const modal = useModal();

    const timeoutReference = useRef<NodeJS.Timeout | null>(null);
    const inputReference = useRef<HTMLInputElement>(null);

    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    const productsResponse = useRequest<OrderService.Responses.Product.Search>({
        request: (controller) => orderService.products.search(controller, { value: debouncedSearch }),
        dependencies: [debouncedSearch],
    });

    const products = productsResponse.response?.is(200) ? productsResponse.response.body.data : [];

    const handleChangeSearch = (value: string) => {
        setSearch(value);

        if (timeoutReference.current)
            clearTimeout(timeoutReference.current);

        timeoutReference.current = setTimeout(() => setDebouncedSearch(value), 250);
    }

    const handleShowProductSheet = (product: OrderService.Models.Product.Get) => {
        modal.openWith(
            <ProductSheet
                product={product}
                onBack={modal.close}
            />
        );
    }

    const displayItems = () => {
        return products.map(product => (
            <button
                key={product.id}
                className="item menu-item"
                onClick={() => handleShowProductSheet(product)}
            >
                {product.name}
            </button>
        ))
    }

    useEffect(() => {
        // TODO: This could be a "useFocus" hook
        if (inputReference.current)
            inputReference.current.focus();
    }, []);

    return (
        <div className='search'>
            <Modal {...modal} />
            <div className="header">
                <div className="search-bar">
                    <SearchIcon />
                    <input
                        name='search'
                        value={search}
                        placeholder='Rechercher'
                        onChange={({ target }) => handleChangeSearch(target.value)}
                        ref={inputReference}
                        autoComplete='off'
                    />
                </div>
                <button
                    className='icon-button'
                    onClick={onClose}
                >
                    <X />
                </button>
            </div>
            <section className="results">
                <p className="title">
                    Produits
                </p>
                {displayItems()}
            </section>
        </div>
    );
}

export default Search;