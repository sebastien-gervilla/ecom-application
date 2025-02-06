// Librairies
import { FC, JSX } from 'react';

// Application
import './pagination.scss';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
    page: number;
    pages: number;
    onChange: (newPage: number) => void;
}

const DISPLAYED_SLOTS = 7;

const Pagination: FC<Props> = ({ page, pages, onChange }) => {

    const displayPages = () => {
        if (pages <= 0)
            return null;

        if (pages <= DISPLAYED_SLOTS) {
            let displayedPages: JSX.Element[] = [];

            for (let current = 1; current <= pages; current++)
                displayedPages.push(getPageButton(current))

            return displayedPages;
        }

        let displayedPages: JSX.Element[] = [getPageButton(1)];

        if (page >= 5)
            displayedPages.push(<p className='rest'>...</p>);
        else
            displayedPages.push(getPageButton(2));

        let middleIndex = page;
        if (page < 4)
            middleIndex = 4;
        else if (pages - page <= 3)
            middleIndex = pages - 3;

        console.log(middleIndex);


        for (let current = middleIndex - 1; current <= middleIndex + 1; current++)
            displayedPages.push(getPageButton(current))

        if (pages - page > 3)
            displayedPages.push(<p className='rest'>...</p>);
        else
            displayedPages.push(getPageButton(pages - 1));

        displayedPages.push(getPageButton(pages));

        return displayedPages;
    }

    const getPageButton = (number: number) => (
        <button
            key={number}
            className='icon-button page'
            onClick={() => onChange(number)}
            disabled={page === number}
        >
            {number}
        </button>
    );

    return (
        <div className='pagination'>
            <button
                className='icon-button'
                onClick={() => onChange(page - 1)}
                disabled={page <= 1}
            >
                <ChevronLeft />
            </button>
            {displayPages()}
            <button
                className='icon-button'
                onClick={() => onChange(page + 1)}
                disabled={page >= pages}
            >
                <ChevronRight />
            </button>
        </div>
    );
}

export default Pagination;